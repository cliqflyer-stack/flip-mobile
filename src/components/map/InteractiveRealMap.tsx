import React, { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { MapStore, USER_LOCATION } from '../../data/mapStoresData';

export interface InteractiveRealMapRef {
  zoomIn: () => void;
  zoomOut: () => void;
  recenter: () => void;
  selectStore: (store: MapStore) => void;
  filterCategory: (category: string) => void;
}

interface InteractiveRealMapProps {
  stores: MapStore[];
  selectedStore: MapStore | null;
  onSelectStore: (store: MapStore) => void;
  onDeselect: () => void;
}

export const InteractiveRealMap = forwardRef<InteractiveRealMapRef, InteractiveRealMapProps>(
  ({ stores, selectedStore, onSelectStore, onDeselect }, ref) => {
    const webViewRef = useRef<WebView>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Build the standalone Leaflet HTML document
    const storesJson = JSON.stringify(stores);
    const userJson = JSON.stringify(USER_LOCATION);
    const selectedStoreId = selectedStore ? selectedStore.id : '';

    const leafletHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    html, body, #map {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      background: #E6EBE6;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      overflow: hidden;
    }
    .leaflet-control-attribution {
      font-size: 8px !important;
      background: rgba(255, 255, 255, 0.6) !important;
    }

    /* Store Marker Badge */
    .store-marker-wrap {
      cursor: pointer;
    }
    .store-badge {
      display: flex;
      align-items: center;
      background: #FFFFFF;
      padding: 4px 8px;
      border-radius: 20px;
      border: 1.5px solid #E2E6E2;
      box-shadow: 0 3px 8px rgba(0,0,0,0.18);
      white-space: nowrap;
      transition: all 0.2s ease;
      transform: translate(-50%, -100%);
    }
    .store-badge.selected {
      background: #075E50;
      border: 2px solid #D8F36A;
      box-shadow: 0 4px 14px rgba(7, 94, 80, 0.45);
      transform: translate(-50%, -105%) scale(1.08);
      z-index: 9999 !important;
    }
    .store-logo {
      width: 22px;
      height: 22px;
      border-radius: 11px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 5px;
      font-size: 9.5px;
      font-weight: 800;
      flex-shrink: 0;
    }
    .store-badge.selected .store-logo {
      border: 1px solid #D8F36A;
    }
    .store-text-group {
      display: flex;
      flex-direction: column;
      line-height: 1.1;
    }
    .store-name-text {
      font-size: 11px;
      font-weight: 700;
      color: #123D38;
      letter-spacing: -0.2px;
    }
    .store-badge.selected .store-name-text {
      color: #FFFFFF;
    }
    .store-dist-text {
      font-size: 9px;
      color: #697773;
      font-weight: 500;
    }
    .store-badge.selected .store-dist-text {
      color: #D8F36A;
      font-weight: 600;
    }

    /* User Beacon */
    .user-beacon-wrap {
      position: relative;
      width: 24px;
      height: 24px;
      transform: translate(-50%, -50%);
    }
    .user-dot {
      width: 20px;
      height: 20px;
      border-radius: 10px;
      background: #075E50;
      border: 2.5px solid #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #D8F36A;
      font-size: 7px;
      font-weight: 900;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      position: relative;
      z-index: 5;
    }
    .user-halo {
      position: absolute;
      top: -10px;
      left: -10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(7, 94, 80, 0.22);
      animation: beaconPulse 2s infinite ease-out;
      z-index: 2;
    }
    @keyframes beaconPulse {
      0% { transform: scale(0.6); opacity: 0.9; }
      100% { transform: scale(1.6); opacity: 0; }
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    const storesData = ${storesJson};
    const userLocation = ${userJson};
    let currentSelectedId = '${selectedStoreId}';

    // Initialize Leaflet Map centered at Markham, ON
    const map = L.map('map', {
      center: [userLocation.latitude, userLocation.longitude],
      zoom: 13,
      minZoom: 11,
      maxZoom: 18,
      zoomControl: false,
      attributionControl: true
    });

    // Use CartoDB Positron clean light tiles matching flip's ivory/green palette
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Add User Pulse Beacon Marker
    const userIcon = L.divIcon({
      className: 'user-beacon-marker',
      html: '<div class="user-beacon-wrap"><div class="user-halo"></div><div class="user-dot">You</div></div>',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
    L.marker([userLocation.latitude, userLocation.longitude], { icon: userIcon, zIndexOffset: 1000 }).addTo(map);

    // Store markers map
    const storeMarkers = {};

    function renderStoreMarkers(selectedId) {
      storesData.forEach(store => {
        const isSelected = store.id === selectedId;
        const iconHtml = \`
          <div class="store-marker-wrap">
            <div class="store-badge \${isSelected ? 'selected' : ''}">
              <div class="store-logo" style="background-color: \${store.logoBg}; color: \${store.logoColor || '#FFFFFF'};">
                \${store.initial}
              </div>
              <div class="store-text-group">
                <span class="store-name-text">\${store.name}</span>
                <span class="store-dist-text">\${store.distance}</span>
              </div>
            </div>
          </div>
        \`;

        const storeIcon = L.divIcon({
          className: 'custom-store-pin',
          html: iconHtml,
          iconSize: [120, 36],
          iconAnchor: [60, 36]
        });

        if (storeMarkers[store.id]) {
          storeMarkers[store.id].setIcon(storeIcon);
          storeMarkers[store.id].setZIndexOffset(isSelected ? 9999 : 500);
        } else {
          const marker = L.marker([store.latitude, store.longitude], {
            icon: storeIcon,
            zIndexOffset: isSelected ? 9999 : 500
          }).addTo(map);

          marker.on('click', (e) => {
            L.DomEvent.stopPropagation(e);
            currentSelectedId = store.id;
            renderStoreMarkers(store.id);
            map.panTo([store.latitude, store.longitude], { animate: true, duration: 0.6 });
            sendMessage({ type: 'SELECT_STORE', storeId: store.id });
          });

          storeMarkers[store.id] = marker;
        }
      });
    }

    renderStoreMarkers(currentSelectedId);

    // Map canvas click deselects
    map.on('click', () => {
      currentSelectedId = '';
      renderStoreMarkers('');
      sendMessage({ type: 'DESELECT' });
    });

    // Communication with React Native parent
    function sendMessage(msg) {
      const dataStr = JSON.stringify(msg);
      if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
        window.ReactNativeWebView.postMessage(dataStr);
      } else if (window.parent) {
        window.parent.postMessage(dataStr, '*');
      }
    }

    // Handle incoming messages from React Native controls
    function handleParentMessage(data) {
      try {
        const cmd = typeof data === 'string' ? JSON.parse(data) : data;
        if (cmd.type === 'ZOOM_IN') {
          map.zoomIn();
        } else if (cmd.type === 'ZOOM_OUT') {
          map.zoomOut();
        } else if (cmd.type === 'RECENTER') {
          currentSelectedId = '';
          renderStoreMarkers('');
          map.flyTo([userLocation.latitude, userLocation.longitude], 13, { duration: 0.8 });
        } else if (cmd.type === 'SELECT_STORE') {
          currentSelectedId = cmd.storeId;
          renderStoreMarkers(cmd.storeId);
          const target = storesData.find(s => s.id === cmd.storeId);
          if (target) {
            map.flyTo([target.latitude, target.longitude], 14, { duration: 0.6 });
          }
        }
      } catch (err) {
        console.error('Map message error:', err);
      }
    }

    window.addEventListener('message', (event) => {
      handleParentMessage(event.data);
    });
    document.addEventListener('message', (event) => {
      handleParentMessage(event.data);
    });
  </script>
</body>
</html>`;

    // Process messages from map to React Native
    const handleMessage = (dataString: string) => {
      try {
        const msg = JSON.parse(dataString);
        if (msg.type === 'SELECT_STORE') {
          const match = stores.find((s) => s.id === msg.storeId);
          if (match) {
            onSelectStore(match);
          }
        } else if (msg.type === 'DESELECT') {
          onDeselect();
        }
      } catch (e) {
        // ignore parse error
      }
    };

    // Forward imperative control methods
    useImperativeHandle(ref, () => ({
      zoomIn: () => {
        const cmd = JSON.stringify({ type: 'ZOOM_IN' });
        if (Platform.OS === 'web' && iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage(cmd, '*');
        } else if (webViewRef.current) {
          webViewRef.current.postMessage(cmd);
        }
      },
      zoomOut: () => {
        const cmd = JSON.stringify({ type: 'ZOOM_OUT' });
        if (Platform.OS === 'web' && iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage(cmd, '*');
        } else if (webViewRef.current) {
          webViewRef.current.postMessage(cmd);
        }
      },
      recenter: () => {
        const cmd = JSON.stringify({ type: 'RECENTER' });
        if (Platform.OS === 'web' && iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage(cmd, '*');
        } else if (webViewRef.current) {
          webViewRef.current.postMessage(cmd);
        }
      },
      selectStore: (store: MapStore) => {
        const cmd = JSON.stringify({ type: 'SELECT_STORE', storeId: store.id });
        if (Platform.OS === 'web' && iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage(cmd, '*');
        } else if (webViewRef.current) {
          webViewRef.current.postMessage(cmd);
        }
      },
      filterCategory: (category: string) => {
        const cmd = JSON.stringify({ type: 'FILTER', category });
        if (Platform.OS === 'web' && iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage(cmd, '*');
        } else if (webViewRef.current) {
          webViewRef.current.postMessage(cmd);
        }
      },
    }));

    // Web event listener
    useEffect(() => {
      if (Platform.OS !== 'web') return;

      const handleWebMessage = (e: MessageEvent) => {
        if (typeof e.data === 'string' && (e.data.includes('SELECT_STORE') || e.data.includes('DESELECT'))) {
          handleMessage(e.data);
        }
      };

      window.addEventListener('message', handleWebMessage);
      return () => {
        window.removeEventListener('message', handleWebMessage);
      };
    }, [stores]);

    if (Platform.OS === 'web') {
      return (
        <View style={styles.container}>
          <iframe
            ref={iframeRef as any}
            srcDoc={leafletHtml}
            style={webIframeStyle as any}
            title="Real Interactive Map"
          />
        </View>
      );
    }

    const NativeWebView = WebView as any;

    return (
      <View style={styles.container}>
        <NativeWebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{ html: leafletHtml }}
          onMessage={(event: any) => handleMessage(event.nativeEvent.data)}
          style={styles.webView}
          javaScriptEnabled
          domStorageEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
);

const webIframeStyle = {
  width: '100%',
  height: '100%',
  border: 'none',
  outline: 'none',
  display: 'block',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#E6EBE6',
    overflow: 'hidden',
  },
  webView: {
    flex: 1,
    backgroundColor: '#E6EBE6',
  },
});
