export default class MediaLibraryCloseEvent extends CustomEvent<{}> {
  constructor() {
    super('mediaLibraryClose', {});
  }
}
