import * as intermediate from './intermediate.mjs' ;

console.log( 'BUGGA', intermediate ) ;

const mk_btn = ( entry = {} ) =>
  {
    if( typeof entry !== 'object' ) return ;
    let my_answer = '' ;
    if( Object.hasOwn( entry, 'says' ) ) {
      my_answer = 'No brainer, dude - a typical ' + entry.species + ' says "' + entry.says + '" (individuals may vary)' ;
    }
    else {
      my_answer = 'Oh - if I\'m informed correctly, a ' + entry.species + ' does not say anything ...' ;
    }
    const my_el = document.createElement( 'button' ) ;
    my_el.append( 'What does a ' + entry.species + ' say?' ) ;
    my_el.onclick = () => alert( '\n' + my_answer ) ;
    document.getElementById( 'animal_buttons' ).append( my_el ) ;
  }
;

const show_source = ( filename = '', parent_id = '', multi = false, clip_at = '', clip_msg = '' ) =>
  {
    const my_show_el = document.createElement( 'div' ) ;
    my_show_el.className = 'show_source';
    if( multi ) my_show_el.className += ' show_source_multi' ;
    const my_show_head = document.createElement( 'h3' ) ;
    my_show_head.append( filename + '.mjs' ) ;
    if( clip_at !== '' ) my_show_head.append( ' (clipped)' ) ;
    const my_load_info = document.createElement( 'p' ) ;
    my_load_info.style.fontStyle = 'italic' ;
    my_load_info.append( 'loading unbundled module code for demonstration ...' ) ;
    my_show_el.append( my_show_head, my_load_info ) ;
    const my_show_pre = document.createElement( 'pre' ) ;
    fetch( 'mjs/' + filename + '.mjs' )
      .then( res => res.text() )
      .then( out =>
        {
          if( clip_at !== '' ) out = out.substring( 0, out.indexOf( clip_at ) ) + clip_msg ;
          my_show_pre.append( out ) ;
          my_load_info.replaceWith( my_show_pre ) ;
        }
      ) ;
    document.getElementById( parent_id ).append( my_show_el ) ;
  }
;

Object.keys( intermediate )
  .forEach( entry => mk_btn( intermediate[ entry ] ) ) ;

[ 'main', 'intermediate' ].concat( Object.keys( intermediate ) )
  .forEach( entry => show_source( entry, 'show_mjs', true ) ) ;

show_source( 'bundle', 'show_bundle', false, 'const mk_btn', '(... Code after modules ...)' ) ;