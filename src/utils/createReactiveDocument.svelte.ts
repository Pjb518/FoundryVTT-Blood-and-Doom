export default function createReactiveDocument(
  document: foundry.abstract.Document.Any,
  hookOverride: string | null = null
) {
  const openHooks: number[] = [];
  const hook = hookOverride ?? `update${document.documentName}`;
  let documentData = $state(document.toObject(false) as any);

  const store = { ...documentData };

  Object.keys(documentData).forEach((property) => {
    Object.defineProperty(store, property, {
      get() {
        return documentData[property];
      },
      set(newValue) {
        documentData[property] = newValue;
        document.update({ [property]: newValue });
      }
    });
  });

  openHooks.push(Hooks.on(hook, (triggeringDocument, _, { diff }) => {
    if (diff === false) return;

    if (triggeringDocument._id === $state.snapshot(documentData)?._id) {
      documentData = document.toObject(false);
    }
  }));

  if (document.documentName === 'Actor') {
    openHooks.push(Hooks.on('createItem', (triggeringDocument, _, { diff }) => {
      if (diff === false) return;

      if (triggeringDocument?.actor?._id === $state.snapshot(documentData)?._id) {
        documentData = document.toObject(false);
      }
    }));

    openHooks.push(Hooks.on('deleteItem', (triggeringDocument, _, { diff }) => {
      if (diff === false) return;

      if (triggeringDocument?.actor?._id === $state.snapshot(documentData)?._id) {
        documentData = document.toObject(false);
      }
    }));

    openHooks.push(Hooks.on('updateItem', (triggeringDocument, _, { diff }) => {
      if (diff === false) return;

      if (triggeringDocument?.actor?._id === $state.snapshot(documentData)?._id) {
        documentData = document.toObject(false);
      }
    }));
  }

  return store;
}
