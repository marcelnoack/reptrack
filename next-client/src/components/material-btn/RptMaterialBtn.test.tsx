import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { RptMaterialBtn, RptMaterialBtnProps } from './RptMaterialBtn';

describe( 'RptMaterialBtn component', () => {
  const onClickMock = jest.fn();

  const defaultProps: RptMaterialBtnProps = {
    icon: 'delete',
    action: onClickMock,
  };

  it( 'renders button with icon', () => {
    render( <RptMaterialBtn {...defaultProps} /> );
    console.log( 'Screen', screen.getByText( 'delete' ) );
    expect( screen.getByText( 'delete' ) ).toBeInTheDocument();
  } );

  it( 'renders button with label', () => {
    render( <RptMaterialBtn {...defaultProps} label="edit" /> );
    expect( screen.getByText( 'edit' ) ).toBeInTheDocument();
  } );

  it( 'calls onClick handler when clicked', () => {
    render( <RptMaterialBtn {...defaultProps} /> );
    fireEvent.click( screen.getByText( 'delete' ) );
    expect( onClickMock ).toHaveBeenCalled();
  } );

  it( 'renders button with mini styling', () => {
    render( <RptMaterialBtn {...defaultProps} mini /> );
    expect( screen.getByTestId( 'rpt-material-btn' ) ).toHaveClass( 'p-2' );
  } );

  it( 'renders button with regular styling', () => {
    render( <RptMaterialBtn {...defaultProps} /> );
    expect( screen.getByTestId( 'rpt-material-btn' ) ).toHaveClass( 'p-2.5' );
  } );
} );
