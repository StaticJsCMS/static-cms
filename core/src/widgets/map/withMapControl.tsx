import { css, styled } from '@mui/material/styles';
import GeoJSON from 'ol/format/GeoJSON';
import Draw from 'ol/interaction/Draw';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map.js';
import olStyles from 'ol/ol.css';
import OSMSource from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View.js';
import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';

import ObjectWidgetTopBar from '../../components/UI/ObjectWidgetTopBar';
import Outline from '../../components/UI/Outline';
import transientOptions from '../../lib/util/transientOptions';

import type { Geometry } from 'ol/geom';
import type { MapField, WidgetControlProps } from '../../interface';

const StyledMapControlWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

interface StyledMapControlContentProps {
  $collapsed: boolean;
  $height: string;
}

const StyledMapControlContent = styled(
  'div',
  transientOptions,
)<StyledMapControlContentProps>(
  ({ $collapsed, $height }) => `
    display: flex;
    postion: relative;
    height: ${$height}
    ${
      $collapsed
        ? `
          visibility: hidden;
          height: 0;
          width: 0;
        `
        : ''
    }
  `,
);

const StyledMap = styled('div')`
  width: 100%;
  position: relative;
  ${css`
    ${olStyles}
  `}
`;

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
  const MapControl = ({
    path,
    value,
    field,
    onChange,
    hasErrors,
    label,
    t,
  }: WidgetControlProps<string, MapField>) => {
    const [collapsed, setCollapsed] = useState(false);

    const handleCollapseToggle = useCallback(() => {
      setCollapsed(!collapsed);
    }, [collapsed]);
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
          onChange(format.writeGeometry(geometry, writeOptions));
        }
      });
    }, [field, mapContainer, onChange, path, value]);

    return (
      <StyledMapControlWrapper>
        <ObjectWidgetTopBar
          key="file-control-top-bar"
          collapsed={collapsed}
          onCollapseToggle={handleCollapseToggle}
          heading={label}
          hasError={hasErrors}
          t={t}
        />
        <StyledMapControlContent $collapsed={collapsed} $height={height}>
          <StyledMap ref={mapContainer} />
        </StyledMapControlContent>
        <Outline hasError={hasErrors} />
      </StyledMapControlWrapper>
    );
  };

  MapControl.displayName = 'MapControl';

  return MapControl;
}
