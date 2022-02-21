import { Container, Rule } from 'postcss';

export const selector = (node?: Container): string =>
  (node?.parent instanceof Rule ? node.parent.selector : '').replace(/[#.]/g, '');
