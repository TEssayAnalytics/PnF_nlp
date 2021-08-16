// globals
const KEY_CODES = {
  'BACKSPACE': 'Backspace',
  'DELETE': 'Delete'
};
const VALID_KEYS = [
  KEY_CODES['BACKSPACE'],
  KEY_CODES['DELETE']
];
const MAX_WORDS = 650;

// funcs
function check_words(e) {
    // get tokenized words
    var clean_words = tokenize(this.value);

    // get word count
    let word_count = get_word_length(clean_words);

    // now check if words are over limit
    if (word_count > MAX_WORDS && VALID_KEYS.indexOf(e.key) == -1) {
        // prevent the default response
        e.preventDefault();

        // now we have to start with original text
        let text = this.value.replace(/[\r?\n|\r]+/gm, ' ');

        // now get original UN-tokenized words (all original case/punctuation)
        let original_words = text.split(' ');

        // now onl get max words worth of words (without any line breaks)
        let subset_words = original_words.slice(0, MAX_WORDS).concat(['']);

        // update textarea text with line breaks removed and words < MAX_WORDS
        this.value = subset_words.join(' ');

        // update clean words for scoring
        clean_words = clean_words.slice(0, MAX_WORDS);

        // update words count
        word_count = MAX_WORDS;
    }

    // pass text to scoring func (from: statics/nlp.js)
    let score = score_fr_df(clean_words);

    // get output elements
    const avg_score_div = document.getElementById('avg_word_score');
    const misc_score_div = document.getElementById('misc_score_metrics');

    // setup total words template
    var total_words_template = word_count;

    // finally check if max words reached
    if (word_count == MAX_WORDS) {
      // update total words template with maximum words warning
      total_words_template = word_count + ' ' + '(maximum words limit)';
    }

    // update score
    avg_score_div.innerHTML =
      'Avg. Word Score: ' + (word_count != 0 ? score/word_count : 0).toFixed(4);
    misc_score_div.innerHTML =
      'Total Words: ' + total_words_template +
      '  |  ' +
      'Total Score: ' + score.toFixed(4);
}

/*
on load
*/
// get prompt area where essay will be written
const textarea = document.getElementById('prompt');

// now add even listeners for ANY key up or key down event
textarea.addEventListener('keydown', check_words);
textarea.addEventListener('keyup', check_words);
