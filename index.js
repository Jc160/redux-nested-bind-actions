

/**
 * This function handles the bind actions creator to the dispatch.
 * @param  {Function} fnActionCreator Action creator
 * @param  {Function} fnDispatch      Dispatch
 * @return {Function}                 Action Dispatcher
 */
function bindActionCreator(fnActionCreator, fnDispatch) {
  return (...listArguments) => fnDispatch(fnActionCreator(...listArguments, fnDispatch));
}



/**
 * This function handles the nested action creators parser.
 * @param  {Variable} varActionCreators Action creators
 * @param  {Function} fnDispatch        Dispatch
 * @return {Variable}
 */
function bindActionCreators(varActionCreators, fnDispatch) {
  if (typeof varActionCreators === 'function') {
    return bindActionCreator(varActionCreators, fnDispatch);
  }


  if (typeof varActionCreators !== 'object' || varActionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${actionCreators === null ? 'null' : typeof actionCreators}. ` +
      `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
    )
  }


  return Object.keys(varActionCreators).reduce((objActionCreators, strKey) => {
    const varActionCreator = varActionCreators[strKey];
    let varResult = null;

    if (typeof varActionCreator === 'function') {
      varResult = bindActionCreator(varActionCreator, fnDispatch);
    } else if (typeof varActionCreator === 'object') {
      varResult = bindActionCreators(varActionCreator, fnDispatch);
    }


    return Object.assign(objActionCreators, { [strKey]: varResult } );
  }, {});
}


module.exports = bindActionCreators;
