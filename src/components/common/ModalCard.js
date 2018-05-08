// This is a presentational component that provides a card UI
// configurable props: borderRadius, boxShadow


import React from 'react';
import { X } from 'react-feather';
import { Colors, BorderRadius } from '../../config/styles';

const Header = ({ onClick, header, noHeaderBorder }) => (
  <div
    className="flex items-center tc flex-row relative justify-center pa4 brand-primary"
    >
    {header}
    <div
      className="absolute right-1 pointer"
      onClick={onClick}
      onKeyPress={onClick}
      role="button">
      <X color={Colors.silver} size={30} />
    </div>
  </div>
);

const ModalCard = ({
  header, onClick, children, borderRadius, boxShadow, noHeaderBorder
}) => (
  <div className="absolute top-0 bottom-0 right-0 left-0 flex justify-center">
    <div className="w-100 bg-white absolute z-2 mt4 mb4 mw6"
      style={{
          borderRadius: borderRadius || BorderRadius.all,
          boxShadow: boxShadow ? `0 8px ${BorderRadius.all || BorderRadius.all} rgba(0,0,0,0.5)` : 'none'
        }}>
      <Header onClick={onClick} header={header} noHeaderBorder={noHeaderBorder}/>
      {children}
    </div>
    <div
      role="button"
      className="fixed top-0 bottom-0 right-0 left-0 z-1"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)"
      }}
      onClick={onClick}
       />
  </div>
);

export default ModalCard;
