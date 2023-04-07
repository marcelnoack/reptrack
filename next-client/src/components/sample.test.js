function add( a, b ) {
  return a + b;
}

describe( 'add function', () => {
  it( 'adds two numbers correctly', () => {
    expect( add( 2, 3 ) ).toBe( 5 );
  } );

  it( 'returns NaN if any argument is not a number', () => {
    expect( add( 'hello', 5 ) ).toBeNaN();
    expect( add( 2, 'world' ) ).toBeNaN();
    expect( add( 'hello', 'world' ) ).toBeNaN();
  } );
} );
