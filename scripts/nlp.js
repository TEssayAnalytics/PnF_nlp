// funcs
function tokenize(text) {
  // get lower case of text
  let lower_text = text.toLowerCase();

  // remove non-alpha chars
  let alpha_text = lower_text.replace(/[^a-z0-9\s]/gi, '');

  // convert line breaks to spices
  let cleaned_text = alpha_text.replace(/[\r\n|\r\r]+/gm, ' ');

  // split on spaces
  return cleaned_text.split(' ');
}

function get_word_length(words) {
  // remove empty strings
  return words.filter(Boolean).length;
}

function score_fr_df(words) {
  // get scores (from: data/fr_df_data.js)
  let scores = words.map(w => FR_DF_VALUES[w] || 0);

  // now sum
  return scores.reduce((total, n) => total + n, 0);
}
