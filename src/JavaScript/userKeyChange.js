// Instead of saving my api key here or anywhere at all, instead I am requiring the user to paste in their own API key if they wish to use this app.
// In the case where one does not want to have to do that every time, you can paste and store the key in this file instead but note that this file is not ignored by default for github.
export let apiKey = 'empty';

export function changeKey(key) {
  apiKey = key;
}
