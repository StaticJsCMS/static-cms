import type { Config, RelationField } from '../interface';
export interface RelationKitchenSinkPostField extends Omit<RelationField, 'widget'> {
    widget: 'relationKitchenSinkPost';
}
declare const testConfig: Config<RelationKitchenSinkPostField>;
export default testConfig;
