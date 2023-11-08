import { createMockEntry } from '@staticcms/test/data/entry.mock';
import { invokeEvent, registerEventListener, removeEventListener } from '../registry';
import set from '../util/set.util';

import type { EventListener } from '@staticcms/core/interface';

jest.spyOn(console, 'info').mockImplementation(() => {});

describe('registry', () => {
  let listener: EventListener | undefined;

  afterEach(() => {
    if (listener) {
      removeEventListener(listener);
      listener = undefined;
    }
  });

  describe('events', () => {
    it('should invoke registered login event', done => {
      listener = {
        name: 'login',
        handler: ({ author }) => {
          expect(author).toEqual({
            login: 'username',
            name: 'User Name',
          });
          done();
        },
      };

      registerEventListener(listener);

      invokeEvent({
        name: 'login',
        data: {
          login: 'username',
          name: 'User Name',
        },
      });
    });

    it('should invoke registered logout event', done => {
      listener = {
        name: 'logout',
        handler: () => {
          done();
        },
      };

      registerEventListener(listener);

      invokeEvent({
        name: 'logout',
      });
    });

    it('should invoke registered mounted event', done => {
      listener = {
        name: 'mounted',
        handler: () => {
          done();
        },
      };

      registerEventListener(listener);

      invokeEvent({
        name: 'mounted',
      });
    });

    describe('change event', () => {
      describe('folder collection', () => {
        it('should invoke event listener for all changes', async () => {
          listener = {
            name: 'change',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                file: undefined,
                field: 'path.to.field',
                data: {
                  path: {
                    to: {
                      field: 'fieldValue',
                    },
                  },
                },
              });

              return set(data.data, data.field, 'NEW FIELD VALUE');
            },
          };

          registerEventListener(listener);

          expect(
            await invokeEvent({
              name: 'change',
              collection: 'collectionName',
              field: 'path.to.field',
              fieldName: 'fieldName',
              data: {
                path: {
                  to: {
                    field: 'fieldValue',
                  },
                },
              },
            }),
          ).toEqual({
            path: {
              to: {
                field: 'NEW FIELD VALUE',
              },
            },
          });
        });

        it('should invoke event listener for whole collection changes', async () => {
          listener = {
            name: 'change',
            collection: 'collectionName',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                file: undefined,
                field: 'path.to.field',
                data: {
                  path: {
                    to: {
                      field: 'fieldValue',
                    },
                  },
                },
              });

              return set(data.data, data.field, 'NEW FIELD VALUE');
            },
          };

          registerEventListener(listener);

          expect(
            await invokeEvent({
              name: 'change',
              collection: 'collectionName',
              field: 'path.to.field',
              fieldName: 'fieldName',
              data: {
                path: {
                  to: {
                    field: 'fieldValue',
                  },
                },
              },
            }),
          ).toEqual({
            path: {
              to: {
                field: 'NEW FIELD VALUE',
              },
            },
          });
        });

        it('should invoke event listener for specific field changes', async () => {
          listener = {
            name: 'change',
            collection: 'collectionName',
            field: 'path.to.field',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                file: undefined,
                field: 'path.to.field',
                data: {
                  path: {
                    to: {
                      field: 'fieldValue',
                    },
                  },
                },
              });

              return set(data.data, data.field, 'NEW FIELD VALUE');
            },
          };

          registerEventListener(listener);

          expect(
            await invokeEvent({
              name: 'change',
              collection: 'collectionName',
              field: 'path.to.field',
              fieldName: 'fieldName',
              data: {
                path: {
                  to: {
                    field: 'fieldValue',
                  },
                },
              },
            }),
          ).toEqual({
            path: {
              to: {
                field: 'NEW FIELD VALUE',
              },
            },
          });
        });
      });

      describe('file collection', () => {
        it('should invoke event listener for all changes', async () => {
          listener = {
            name: 'change',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                file: 'fileName',
                field: 'path.to.field',
                data: {
                  path: {
                    to: {
                      field: 'fieldValue',
                    },
                  },
                },
              });

              return set(data.data, data.field, 'NEW FIELD VALUE');
            },
          };

          registerEventListener(listener);

          expect(
            await invokeEvent({
              name: 'change',
              collection: 'collectionName',
              file: 'fileName',
              field: 'path.to.field',
              fieldName: 'fieldName',
              data: {
                path: {
                  to: {
                    field: 'fieldValue',
                  },
                },
              },
            }),
          ).toEqual({
            path: {
              to: {
                field: 'NEW FIELD VALUE',
              },
            },
          });
        });

        it('should invoke event listener for whole collection changes', async () => {
          listener = {
            name: 'change',
            collection: 'collectionName',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                file: 'fileName',
                field: 'path.to.field',
                data: {
                  path: {
                    to: {
                      field: 'fieldValue',
                    },
                  },
                },
              });

              return set(data.data, data.field, 'NEW FIELD VALUE');
            },
          };

          registerEventListener(listener);

          expect(
            await invokeEvent({
              name: 'change',
              collection: 'collectionName',
              file: 'fileName',
              field: 'path.to.field',
              fieldName: 'fieldName',
              data: {
                path: {
                  to: {
                    field: 'fieldValue',
                  },
                },
              },
            }),
          ).toEqual({
            path: {
              to: {
                field: 'NEW FIELD VALUE',
              },
            },
          });
        });

        it('should invoke event listener for whole file changes', async () => {
          listener = {
            name: 'change',
            collection: 'collectionName',
            file: 'fileName',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                file: 'fileName',
                field: 'path.to.field',
                data: {
                  path: {
                    to: {
                      field: 'fieldValue',
                    },
                  },
                },
              });

              return set(data.data, data.field, 'NEW FIELD VALUE');
            },
          };

          registerEventListener(listener);

          expect(
            await invokeEvent({
              name: 'change',
              collection: 'collectionName',
              file: 'fileName',
              field: 'path.to.field',
              fieldName: 'fieldName',
              data: {
                path: {
                  to: {
                    field: 'fieldValue',
                  },
                },
              },
            }),
          ).toEqual({
            path: {
              to: {
                field: 'NEW FIELD VALUE',
              },
            },
          });
        });

        it('should invoke event listener for specific field changes', async () => {
          listener = {
            name: 'change',
            collection: 'collectionName',
            field: 'path.to.field',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                file: 'fileName',
                field: 'path.to.field',
                data: {
                  path: {
                    to: {
                      field: 'fieldValue',
                    },
                  },
                },
              });

              return set(data.data, data.field, 'NEW FIELD VALUE');
            },
          };

          registerEventListener(listener);

          expect(
            await invokeEvent({
              name: 'change',
              collection: 'collectionName',
              file: 'fileName',
              field: 'path.to.field',
              fieldName: 'fieldName',
              data: {
                path: {
                  to: {
                    field: 'fieldValue',
                  },
                },
              },
            }),
          ).toEqual({
            path: {
              to: {
                field: 'NEW FIELD VALUE',
              },
            },
          });
        });
      });
    });

    describe('preSave event', () => {
      describe('folder collection', () => {
        it('should invoke event listener for all changes', async () => {
          const entry = createMockEntry({
            data: {
              path: {
                to: {
                  field: 'fieldValue',
                },
              },
            },
          });

          listener = {
            name: 'preSave',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                file: undefined,
                data: {
                  author: {
                    login: 'username',
                    name: 'User Name',
                  },
                  entry,
                },
              });

              return set(data.data.entry.data, 'path.to.field', 'NEW FIELD VALUE');
            },
          };

          registerEventListener(listener);

          expect(
            await invokeEvent({
              name: 'preSave',
              collection: 'collectionName',
              data: {
                author: {
                  login: 'username',
                  name: 'User Name',
                },
                entry,
              },
            }),
          ).toEqual({
            path: {
              to: {
                field: 'NEW FIELD VALUE',
              },
            },
          });
        });

        it('should invoke event listener for whole collection changes', async () => {
          const entry = createMockEntry({
            data: {
              path: {
                to: {
                  field: 'fieldValue',
                },
              },
            },
          });

          listener = {
            name: 'preSave',
            collection: 'collectionName',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                data: {
                  author: {
                    login: 'username',
                    name: 'User Name',
                  },
                  entry,
                },
              });

              return set(data.data.entry.data, 'path.to.field', 'NEW FIELD VALUE');
            },
          };

          registerEventListener(listener);

          expect(
            await invokeEvent({
              name: 'preSave',
              collection: 'collectionName',
              data: {
                author: {
                  login: 'username',
                  name: 'User Name',
                },
                entry,
              },
            }),
          ).toEqual({
            path: {
              to: {
                field: 'NEW FIELD VALUE',
              },
            },
          });
        });
      });

      describe('file collection', () => {
        it('should invoke event listener for all changes', async () => {
          const entry = createMockEntry({
            data: {
              path: {
                to: {
                  field: 'fieldValue',
                },
              },
            },
          });

          listener = {
            name: 'preSave',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                file: 'fileName',
                data: {
                  author: {
                    login: 'username',
                    name: 'User Name',
                  },
                  entry,
                },
              });

              return set(data.data.entry.data, 'path.to.field', 'NEW FIELD VALUE');
            },
          };

          registerEventListener(listener);

          expect(
            await invokeEvent({
              name: 'preSave',
              collection: 'collectionName',
              file: 'fileName',
              data: {
                author: {
                  login: 'username',
                  name: 'User Name',
                },
                entry,
              },
            }),
          ).toEqual({
            path: {
              to: {
                field: 'NEW FIELD VALUE',
              },
            },
          });
        });

        it('should invoke event listener for whole collection changes', async () => {
          const entry = createMockEntry({
            data: {
              path: {
                to: {
                  field: 'fieldValue',
                },
              },
            },
          });

          listener = {
            name: 'preSave',
            collection: 'collectionName',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                file: 'fileName',
                data: {
                  author: {
                    login: 'username',
                    name: 'User Name',
                  },
                  entry,
                },
              });

              return set(data.data.entry.data, 'path.to.field', 'NEW FIELD VALUE');
            },
          };

          registerEventListener(listener);

          expect(
            await invokeEvent({
              name: 'preSave',
              collection: 'collectionName',
              file: 'fileName',
              data: {
                author: {
                  login: 'username',
                  name: 'User Name',
                },
                entry,
              },
            }),
          ).toEqual({
            path: {
              to: {
                field: 'NEW FIELD VALUE',
              },
            },
          });
        });

        it('should invoke event listener for whole file changes', async () => {
          const entry = createMockEntry({
            data: {
              path: {
                to: {
                  field: 'fieldValue',
                },
              },
            },
          });

          listener = {
            name: 'preSave',
            collection: 'collectionName',
            file: 'fileName',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                file: 'fileName',
                data: {
                  author: {
                    login: 'username',
                    name: 'User Name',
                  },
                  entry,
                },
              });

              return set(data.data.entry.data, 'path.to.field', 'NEW FIELD VALUE');
            },
          };

          registerEventListener(listener);

          expect(
            await invokeEvent({
              name: 'preSave',
              collection: 'collectionName',
              file: 'fileName',
              data: {
                author: {
                  login: 'username',
                  name: 'User Name',
                },
                entry,
              },
            }),
          ).toEqual({
            path: {
              to: {
                field: 'NEW FIELD VALUE',
              },
            },
          });
        });
      });
    });

    describe('postSave event', () => {
      describe('folder collection', () => {
        it('should invoke event listener for all changes', done => {
          const entry = createMockEntry({
            data: {
              path: {
                to: {
                  field: 'fieldValue',
                },
              },
            },
          });

          listener = {
            name: 'postSave',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                file: undefined,
                data: {
                  author: {
                    login: 'username',
                    name: 'User Name',
                  },
                  entry,
                },
              });

              done();
            },
          };

          registerEventListener(listener);

          invokeEvent({
            name: 'postSave',
            collection: 'collectionName',
            data: {
              author: {
                login: 'username',
                name: 'User Name',
              },
              entry,
            },
          });
        });

        it('should invoke event listener for whole collection changes', done => {
          const entry = createMockEntry({
            data: {
              path: {
                to: {
                  field: 'fieldValue',
                },
              },
            },
          });

          listener = {
            name: 'postSave',
            collection: 'collectionName',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                data: {
                  author: {
                    login: 'username',
                    name: 'User Name',
                  },
                  entry,
                },
              });

              done();
            },
          };

          registerEventListener(listener);

          invokeEvent({
            name: 'postSave',
            collection: 'collectionName',
            data: {
              author: {
                login: 'username',
                name: 'User Name',
              },
              entry,
            },
          });
        });
      });

      describe('file collection', () => {
        it('should invoke event listener for all changes', done => {
          const entry = createMockEntry({
            data: {
              path: {
                to: {
                  field: 'fieldValue',
                },
              },
            },
          });

          listener = {
            name: 'postSave',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                file: 'fileName',
                data: {
                  author: {
                    login: 'username',
                    name: 'User Name',
                  },
                  entry,
                },
              });

              done();
            },
          };

          registerEventListener(listener);

          invokeEvent({
            name: 'postSave',
            collection: 'collectionName',
            file: 'fileName',
            data: {
              author: {
                login: 'username',
                name: 'User Name',
              },
              entry,
            },
          });
        });

        it('should invoke event listener for whole collection changes', done => {
          const entry = createMockEntry({
            data: {
              path: {
                to: {
                  field: 'fieldValue',
                },
              },
            },
          });

          listener = {
            name: 'postSave',
            collection: 'collectionName',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                file: 'fileName',
                data: {
                  author: {
                    login: 'username',
                    name: 'User Name',
                  },
                  entry,
                },
              });

              done();
            },
          };

          registerEventListener(listener);

          invokeEvent({
            name: 'postSave',
            collection: 'collectionName',
            file: 'fileName',
            data: {
              author: {
                login: 'username',
                name: 'User Name',
              },
              entry,
            },
          });
        });

        it('should invoke event listener for whole file changes', done => {
          const entry = createMockEntry({
            data: {
              path: {
                to: {
                  field: 'fieldValue',
                },
              },
            },
          });

          listener = {
            name: 'postSave',
            collection: 'collectionName',
            file: 'fileName',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                file: 'fileName',
                data: {
                  author: {
                    login: 'username',
                    name: 'User Name',
                  },
                  entry,
                },
              });

              done();
            },
          };

          registerEventListener(listener);

          invokeEvent({
            name: 'postSave',
            collection: 'collectionName',
            file: 'fileName',
            data: {
              author: {
                login: 'username',
                name: 'User Name',
              },
              entry,
            },
          });
        });
      });
    });

    describe('prePublish event', () => {
      describe('folder collection', () => {
        it('should invoke event listener for all changes', done => {
          const entry = createMockEntry({
            data: {
              path: {
                to: {
                  field: 'fieldValue',
                },
              },
            },
          });

          listener = {
            name: 'prePublish',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                file: undefined,
                data: {
                  author: {
                    login: 'username',
                    name: 'User Name',
                  },
                  entry,
                },
              });

              done();
            },
          };

          registerEventListener(listener);

          invokeEvent({
            name: 'prePublish',
            collection: 'collectionName',
            data: {
              author: {
                login: 'username',
                name: 'User Name',
              },
              entry,
            },
          });
        });

        it('should invoke event listener for whole collection changes', done => {
          const entry = createMockEntry({
            data: {
              path: {
                to: {
                  field: 'fieldValue',
                },
              },
            },
          });

          listener = {
            name: 'prePublish',
            collection: 'collectionName',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                data: {
                  author: {
                    login: 'username',
                    name: 'User Name',
                  },
                  entry,
                },
              });

              done();
            },
          };

          registerEventListener(listener);

          invokeEvent({
            name: 'prePublish',
            collection: 'collectionName',
            data: {
              author: {
                login: 'username',
                name: 'User Name',
              },
              entry,
            },
          });
        });
      });

      describe('file collection', () => {
        it('should invoke event listener for all changes', done => {
          const entry = createMockEntry({
            data: {
              path: {
                to: {
                  field: 'fieldValue',
                },
              },
            },
          });

          listener = {
            name: 'prePublish',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                file: 'fileName',
                data: {
                  author: {
                    login: 'username',
                    name: 'User Name',
                  },
                  entry,
                },
              });

              done();
            },
          };

          registerEventListener(listener);

          invokeEvent({
            name: 'prePublish',
            collection: 'collectionName',
            file: 'fileName',
            data: {
              author: {
                login: 'username',
                name: 'User Name',
              },
              entry,
            },
          });
        });

        it('should invoke event listener for whole collection changes', done => {
          const entry = createMockEntry({
            data: {
              path: {
                to: {
                  field: 'fieldValue',
                },
              },
            },
          });

          listener = {
            name: 'prePublish',
            collection: 'collectionName',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                file: 'fileName',
                data: {
                  author: {
                    login: 'username',
                    name: 'User Name',
                  },
                  entry,
                },
              });

              done();
            },
          };

          registerEventListener(listener);

          invokeEvent({
            name: 'prePublish',
            collection: 'collectionName',
            file: 'fileName',
            data: {
              author: {
                login: 'username',
                name: 'User Name',
              },
              entry,
            },
          });
        });

        it('should invoke event listener for whole file changes', done => {
          const entry = createMockEntry({
            data: {
              path: {
                to: {
                  field: 'fieldValue',
                },
              },
            },
          });

          listener = {
            name: 'prePublish',
            collection: 'collectionName',
            file: 'fileName',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                file: 'fileName',
                data: {
                  author: {
                    login: 'username',
                    name: 'User Name',
                  },
                  entry,
                },
              });

              done();
            },
          };

          registerEventListener(listener);

          invokeEvent({
            name: 'prePublish',
            collection: 'collectionName',
            file: 'fileName',
            data: {
              author: {
                login: 'username',
                name: 'User Name',
              },
              entry,
            },
          });
        });
      });
    });

    describe('postPublish event', () => {
      describe('folder collection', () => {
        it('should invoke event listener for all changes', done => {
          const entry = createMockEntry({
            data: {
              path: {
                to: {
                  field: 'fieldValue',
                },
              },
            },
          });

          listener = {
            name: 'postPublish',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                file: undefined,
                data: {
                  author: {
                    login: 'username',
                    name: 'User Name',
                  },
                  entry,
                },
              });

              done();
            },
          };

          registerEventListener(listener);

          invokeEvent({
            name: 'postPublish',
            collection: 'collectionName',
            data: {
              author: {
                login: 'username',
                name: 'User Name',
              },
              entry,
            },
          });
        });

        it('should invoke event listener for whole collection changes', done => {
          const entry = createMockEntry({
            data: {
              path: {
                to: {
                  field: 'fieldValue',
                },
              },
            },
          });

          listener = {
            name: 'postPublish',
            collection: 'collectionName',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                data: {
                  author: {
                    login: 'username',
                    name: 'User Name',
                  },
                  entry,
                },
              });

              done();
            },
          };

          registerEventListener(listener);

          invokeEvent({
            name: 'postPublish',
            collection: 'collectionName',
            data: {
              author: {
                login: 'username',
                name: 'User Name',
              },
              entry,
            },
          });
        });
      });

      describe('file collection', () => {
        it('should invoke event listener for all changes', done => {
          const entry = createMockEntry({
            data: {
              path: {
                to: {
                  field: 'fieldValue',
                },
              },
            },
          });

          listener = {
            name: 'postPublish',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                file: 'fileName',
                data: {
                  author: {
                    login: 'username',
                    name: 'User Name',
                  },
                  entry,
                },
              });

              done();
            },
          };

          registerEventListener(listener);

          invokeEvent({
            name: 'postPublish',
            collection: 'collectionName',
            file: 'fileName',
            data: {
              author: {
                login: 'username',
                name: 'User Name',
              },
              entry,
            },
          });
        });

        it('should invoke event listener for whole collection changes', done => {
          const entry = createMockEntry({
            data: {
              path: {
                to: {
                  field: 'fieldValue',
                },
              },
            },
          });

          listener = {
            name: 'postPublish',
            collection: 'collectionName',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                file: 'fileName',
                data: {
                  author: {
                    login: 'username',
                    name: 'User Name',
                  },
                  entry,
                },
              });

              done();
            },
          };

          registerEventListener(listener);

          invokeEvent({
            name: 'postPublish',
            collection: 'collectionName',
            file: 'fileName',
            data: {
              author: {
                login: 'username',
                name: 'User Name',
              },
              entry,
            },
          });
        });

        it('should invoke event listener for whole file changes', done => {
          const entry = createMockEntry({
            data: {
              path: {
                to: {
                  field: 'fieldValue',
                },
              },
            },
          });

          listener = {
            name: 'postPublish',
            collection: 'collectionName',
            file: 'fileName',
            handler: data => {
              expect(data).toEqual({
                collection: 'collectionName',
                file: 'fileName',
                data: {
                  author: {
                    login: 'username',
                    name: 'User Name',
                  },
                  entry,
                },
              });

              done();
            },
          };

          registerEventListener(listener);

          invokeEvent({
            name: 'postPublish',
            collection: 'collectionName',
            file: 'fileName',
            data: {
              author: {
                login: 'username',
                name: 'User Name',
              },
              entry,
            },
          });
        });
      });
    });
  });
});
