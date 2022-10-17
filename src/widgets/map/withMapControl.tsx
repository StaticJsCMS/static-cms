import React, { useLayoutEffect, useMemo } from 'react';
import { ClassNames } from '@emotion/react';
import olStyles from 'ol/ol.css';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import GeoJSON from 'ol/format/GeoJSON';
import Draw from 'ol/interaction/Draw';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSMSource from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';

import type { MapField, WidgetControlProps } from '../../interface';
import type { Geometry } from 'ol/geom';

const formatOptions = {
  dataProjection: 'EPSG:4326',
  featureProjection: 'EPSG:3857',
};

function getDefaultFormat() {
  return new GeoJSON(formatOptions);
}

function getDefaultMap(target: HTMLDivElement, featuresLayer: VectorLayer<VectorSource<Geometry>>) {
  return new Map({
    target,
    layers: [new TileLayer({ source: new OSMSource() }), featuresLayer],
    view: new View({ center: [0, 0], zoom: 2 }),
  });
}

interface WithMapControlProps {
  getFormat?: (field: MapField) => GeoJSON;
  getMap?: (target: HTMLDivElement, featuresLayer: VectorLayer<VectorSource<Geometry>>) => Map;
}

export default function withMapControl({ getFormat, getMap }: WithMapControlProps = {}) {
  const MapControl = ({ path, value, field, onChange }: WidgetControlProps<string, MapField>) => {
    const { height = '400px' } = field;
    const mapContainer: React.LegacyRef<HTMLDivElement> = useMemo(() => React.createRef(), []);

    useLayoutEffect(() => {
      const format = getFormat ? getFormat(field) : getDefaultFormat();
      const features = value ? [format.readFeature(value)] : [];

      const featuresSource = new VectorSource({ features, wrapX: false });
      const featuresLayer = new VectorLayer({ source: featuresSource });

      const target = mapContainer.current;
      if (!target) {
        return;
      }

      const map = getMap ? getMap(target, featuresLayer) : getDefaultMap(target, featuresLayer);
      if (features.length > 0) {
        map.getView().fit(featuresSource.getExtent(), { maxZoom: 16, padding: [80, 80, 80, 80] });
      }

      const draw = new Draw({ source: featuresSource, type: field.type ?? 'Point' });
      map.addInteraction(draw);

      const writeOptions = { decimals: field.decimals ?? 7 };
      draw.on('drawend', ({ feature }) => {
        featuresSource.clear();
        const geometry = feature.getGeometry();
        if (geometry) {
          onChange(path, field, format.writeGeometry(geometry, writeOptions));
        }
      });
    }, [field, mapContainer, onChange, path, value]);

    return (
      <ClassNames>
        {({ cx, css }) => (
          <div
            className={cx(
              css`
                ${olStyles};
                padding: 0;
                overflow: hidden;
                height: ${height};
              `,
            )}
            ref={mapContainer}
          />
        )}
      </ClassNames>
    );
  };

  MapControl.displayName = 'MapControl';

  return MapControl;
}
