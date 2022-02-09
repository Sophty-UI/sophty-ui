import { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react';

enum HeadingType {
  H1 = 1,
  H2 = 2,
  H3 = 3,
  H4 = 4,
  H5 = 5,
  H6 = 6,
}

export interface ITitleProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  level?: HeadingType;
}

const Title = ({ level = HeadingType.H1, children, ...props }: ITitleProps): ReactElement => {
  type IHeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  const Tag = `h${Math.max(HeadingType.H1, Math.min(level, HeadingType.H6))}` as IHeadingTag;

  return <Tag {...props}>{children}</Tag>;
};

export default Title;
