import type { DeepPartial } from '@league-of-foundry-developers/foundry-vtt-types/src/types/utils.d.mts';
import { SvelteApplicationMixin, type Configuration } from '#lib/SvelteApplicationMixin.svelte.ts';

const { ApplicationV2 } = foundry.applications.api;

export default class GenericDialog extends SvelteApplicationMixin(ApplicationV2) {
  promise: Promise<any>;

  resolve: any;

  constructor(title, component, data: Record<string, any> = {}, options = {} as Configuration) {
    super(foundry.utils.mergeObject(options, {
      svelte: {
        component,
      },
      position: {
        width: options.width ?? 300,
      },
      window: {
        icon: options.icon ?? 'fa-solid fa-note',
        title
      }
    }));

    this.props = {
      dialog: this,
      ...data
    };

    this.promise = new Promise((resolve) => {
      this.resolve = resolve;
    });
  }

  static override DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    classes: ['bnd-sheet'],
    position: {
      height: 'auto'
    },
    actions: {}
  }, { inplace: false });

  protected override close(
    options?: foundry.applications.api.ApplicationV2.ClosingOptions
  ): Promise<void>;
  protected override close(options?: DeepPartial<ApplicationV2.ClosingOptions>): Promise<this>;
  protected override close(options?: unknown): Promise<void> | Promise<this> | void {
    this.#resolvePromise(null);
    super.close();
  }

  /**
   * Resolves the dialog's promise and closes it.
   */
  submit(results: Record<string, any>) {
    this.#resolvePromise(results);
    return super.close();
  }

  #resolvePromise(data: Record<string, any> | null) {
    if (this.resolve) this.resolve(data);
  }
}
