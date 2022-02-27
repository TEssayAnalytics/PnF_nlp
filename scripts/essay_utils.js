/*
Copyright (C) 2021 TEssay Analytics (http://tessay.org). All Rights Reserved.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

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
    const word_count = clean_words.length;

    // now check if words are over limit
    if (word_count > MAX_WORDS) {
        // update clean words for scoring
        clean_words = clean_words.slice(0, MAX_WORDS);
    }

    // pass text to scoring func (from: statics/nlp.js)
    let score = score_fr_df(clean_words);

    // get output elements
    const rd_score_div = document.getElementById('rd_score');
    const misc_score_div = document.getElementById('misc_score_metrics');

    // setup total words and total score template
    var total_words_template = word_count;
    var total_score_template = score.toFixed(4);

    // finally check if max words reached
    if (clean_words.length == MAX_WORDS) {
      // update total words template with maximum words warning
      total_words_template = total_words_template + ' ' + '(maximum words 650)';
      total_score_template =
        total_score_template + ' ' + '(only scoring first 650 words)'
    }

    // update score
    rd_score_div.innerHTML =
      'Relevance-Density Score: ' +
      (word_count != 0 ? score/clean_words.length : 0).toFixed(4);
    misc_score_div.innerHTML =
      'Total Words: ' + total_words_template +
      '  |  ' +
      'Total Score: ' + total_score_template;
}

/*
on load
*/
// get prompt area where essay will be written
const textarea = document.getElementById('prompt');

// now add even listeners for ANY key up or key down event
textarea.addEventListener('keydown', check_words);
textarea.addEventListener('keyup', check_words);
