export default class LivePreviewLoadedEvent extends CustomEvent<{}> {
  constructor() {
    super('livePreviewLoaded', {});
  }
}
