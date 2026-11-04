import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  LayoutChangeEvent,
  Text,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Hotspot } from '../../data/flyerData';
import { colors } from '../../theme';

interface InteractiveFlyerCanvasProps {
  flyerImage: any;
  aspectRatio: number;
  hotspots: Hotspot[];
  selectedHotspotId: string | null;
  onSelectHotspot: (hotspotId: string | null) => void;
}

export const InteractiveFlyerCanvas: React.FC<InteractiveFlyerCanvasProps> = ({
  flyerImage,
  aspectRatio,
  hotspots,
  selectedHotspotId,
  onSelectHotspot,
}) => {
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const handleLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    if (width > 0 && width !== canvasWidth) {
      setCanvasWidth(width);
    }
  };

  const canvasHeight = canvasWidth > 0 ? canvasWidth * aspectRatio : 0;

  // Animate circular highlight whenever a new hotspot is selected
  useEffect(() => {
    if (selectedHotspotId) {
      scaleAnim.setValue(0.5);
      opacityAnim.setValue(0);
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [selectedHotspotId]);

  const selectedHotspot = hotspots.find((h) => h.id === selectedHotspotId);

  // Zoom handlers
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.3, 2.2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.3, 1));
  };

  const handleZoomReset = () => {
    setZoomLevel(1);
  };

  // Calculate position & diameter of the circular red highlight
  const getHighlightGeometry = () => {
    if (!selectedHotspot || canvasWidth === 0) return null;

    const w = selectedHotspot.width * canvasWidth;
    const h = selectedHotspot.height * canvasHeight;
    const diameter = Math.max(w, h) * 1.35;
    const radius = diameter / 2;

    const centerX = (selectedHotspot.x + selectedHotspot.width / 2) * canvasWidth;
    const centerY = (selectedHotspot.y + selectedHotspot.height / 2) * canvasHeight;

    const left = centerX - radius;
    const top = centerY - radius;

    return { left, top, diameter, radius };
  };

  const highlightGeom = getHighlightGeometry();

  return (
    <View style={styles.outerContainer} onLayout={handleLayout}>
      {canvasWidth > 0 && (
        <ScrollView
          horizontal={zoomLevel > 1}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            zoomLevel > 1 && { width: canvasWidth * zoomLevel },
          ]}
        >
          <View
            style={[
              styles.canvasContainer,
              {
                width: canvasWidth * zoomLevel,
                height: canvasHeight * zoomLevel,
              },
            ]}
          >
            {/* The Flyer Image */}
            <Image
              source={flyerImage}
              style={styles.flyerImage}
              resizeMode="cover"
            />

            {/* Tap Targets / Hotspots */}
            {hotspots.map((hotspot) => {
              const isSelected = hotspot.id === selectedHotspotId;
              return (
                <TouchableOpacity
                  key={hotspot.id}
                  activeOpacity={0.85}
                  onPress={() => onSelectHotspot(hotspot.id)}
                  style={[
                    styles.hotspotTouchArea,
                    {
                      left: `${hotspot.x * 100}%`,
                      top: `${hotspot.y * 100}%`,
                      width: `${hotspot.width * 100}%`,
                      height: `${hotspot.height * 100}%`,
                    },
                    isSelected && styles.hotspotActiveOutline,
                  ]}
                  accessibilityLabel="View product deal"
                >
                  {/* Subtle pulsing indicator to show products are interactive */}
                  <View style={styles.hotspotCenterDot} />
                </TouchableOpacity>
              );
            })}

            {/* Circular Red Highlight on Selected Product */}
            {highlightGeom && (
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.circleHighlight,
                  {
                    left: highlightGeom.left * zoomLevel,
                    top: highlightGeom.top * zoomLevel,
                    width: highlightGeom.diameter * zoomLevel,
                    height: highlightGeom.diameter * zoomLevel,
                    borderRadius: highlightGeom.radius * zoomLevel,
                    transform: [{ scale: scaleAnim }],
                    opacity: opacityAnim,
                  },
                ]}
              />
            )}
          </View>
        </ScrollView>
      )}

      {/* Floating Zoom & Instruction Controls */}
      <View style={styles.floatingControls}>
        <TouchableOpacity
          onPress={handleZoomIn}
          activeOpacity={0.8}
          style={styles.zoomButton}
          accessibilityLabel="Zoom in"
        >
          <Feather name="plus" size={16} color={colors.primaryDark} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleZoomOut}
          activeOpacity={0.8}
          style={styles.zoomButton}
          accessibilityLabel="Zoom out"
        >
          <Feather name="minus" size={16} color={colors.primaryDark} />
        </TouchableOpacity>

        {zoomLevel > 1 && (
          <TouchableOpacity
            onPress={handleZoomReset}
            activeOpacity={0.8}
            style={styles.zoomButton}
            accessibilityLabel="Reset zoom"
          >
            <Feather name="maximize-2" size={14} color={colors.primaryDark} />
          </TouchableOpacity>
        )}
      </View>

      {/* Hint pill banner at top of flyer */}
      <View style={styles.hintBadge}>
        <Feather name="crosshair" size={12} color={colors.primaryDark} />
        <Text style={styles.hintText}>Tap any item on flyer for details</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    position: 'relative',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  canvasContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  flyerImage: {
    width: '100%',
    height: '100%',
  },
  hotspotTouchArea: {
    position: 'absolute',
    borderRadius: 8,
    // Soft transparent touch hit area
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    padding: 2,
    zIndex: 10,
  },
  hotspotActiveOutline: {
    backgroundColor: 'rgba(220, 38, 38, 0.05)',
  },
  hotspotCenterDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(220, 38, 38, 0.35)',
    margin: 4,
  },
  circleHighlight: {
    position: 'absolute',
    borderWidth: 3.5,
    borderColor: '#DC2626',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(220, 38, 38, 0.12)',
    zIndex: 20,
  },
  floatingControls: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderRadius: 24,
    padding: 4,
    gap: 4,
    flexDirection: 'column',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(220, 225, 220, 0.8)',
    zIndex: 30,
  },
  zoomButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  hintBadge: {
    position: 'absolute',
    top: 10,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(247, 245, 238, 0.94)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(220, 225, 220, 0.7)',
    zIndex: 30,
  },
  hintText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primaryDark,
  },
});
