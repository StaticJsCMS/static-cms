import withFileControl, { getValidateValue } from './withFileControl';
import previewComponent from './FilePreview';
import schema from './schema';

const controlComponent = withFileControl();

function Widget() {
  return {
    name: 'file',
    controlComponent,
    previewComponent,
    options: {
      schema,
      getValidateValue,
    },
  };
}

export const StaticCmsWidgetFile = { Widget, controlComponent, previewComponent, withFileControl };
export default StaticCmsWidgetFile;
