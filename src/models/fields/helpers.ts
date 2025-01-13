export type SimpleMerge<Target, Override> = Omit<Target, keyof Override> & Override;
