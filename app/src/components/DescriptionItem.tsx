import { MIDDLE_STYLE } from '@constants/responsive';

interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

const DescriptionItem = ({ title, content, style, textStyle }: DescriptionItemProps) => (
  <div
    style={{
      ...MIDDLE_STYLE,
      justifyContent: 'space-between',
      display: 'flex',
      alignItems: 'center',
      marginTop: 7,
      ...style,
    }}>
    <p
      style={{
        margin: 0,
        fontWeight: 'bold',
        fontSize: 14,
        marginRight: 10,
        whiteSpace: 'nowrap',
        ...textStyle,
      }}>
      {title}:
    </p>
    {content}
  </div>
);

export default DescriptionItem;
