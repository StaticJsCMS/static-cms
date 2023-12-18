import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map.js';
import VectorSource from 'ol/source/Vector';
import React from 'react';
import type { MapField, WidgetControlProps } from '@staticcms/core/interface';
import type { Geometry } from 'ol/geom';
import './MapControl.css';
interface WithMapControlProps {
    getFormat?: (field: MapField) => GeoJSON;
    getMap?: (target: HTMLDivElement, featuresLayer: VectorLayer<VectorSource<Geometry>>) => Map;
}
declare const withMapControl: ({ getFormat, getMap }?: WithMapControlProps) => React.FC<WidgetControlProps<string, MapField, import("@staticcms/core/interface").ObjectValue>>;
export default withMapControl;
