export const toBooleanish = (value: boolean): 'true' | 'false' => value.toString() as ReturnType<typeof toBooleanish>;
