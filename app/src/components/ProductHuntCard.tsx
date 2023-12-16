/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { MIDDLE_STYLE } from '@constants/responsive';
import { GLOBAL_THEME_COLOR } from '@constants/theme';
import { CanvasPHProductConfig } from '@core/models';
import { BiSolidUpvote } from 'react-icons/bi';

type Props = {
  data: CanvasPHProductConfig;
  onClick?: any;
  isSelected?: boolean;
};

const ProductHuntCard = ({ data, onClick, isSelected }: Props) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: '100%',
        height: '100%',
        border: isSelected
          ? `4px solid ${GLOBAL_THEME_COLOR.$highlight_color}`
          : `1px solid ${GLOBAL_THEME_COLOR.$border_color}`,
        padding: '15px 20px',
        backgroundColor: 'white',
        borderRadius: 10,
        cursor: 'pointer',
      }}>
      <div style={{ ...MIDDLE_STYLE, justifyContent: 'space-between', marginBottom: 10 }}>
        <img src={data.thumbnail.url} width={55} style={{ borderRadius: 5 }} />
        {data.rank && (
          <h1 style={{ margin: 0, color: GLOBAL_THEME_COLOR.$dark_text_color }}>
            <span style={{ fontSize: 14 }}>#</span>
            <span>{data.rank}</span>
          </h1>
        )}
      </div>
      <h3 style={{ margin: 0 }}>{data.name}</h3>
      <p style={{ margin: 0 }}>{data.tagline}</p>
      <div
        style={{
          color: GLOBAL_THEME_COLOR.$highlight_color,
          marginTop: 10,
          border: `1px solid ${GLOBAL_THEME_COLOR.$highlight_color}`,
          width: 'fit-content',
          padding: '2px 10px',
          borderRadius: 10,
        }}>
        <BiSolidUpvote /> {data.votesCount}
      </div>
    </div>
  );
};

export default ProductHuntCard;
