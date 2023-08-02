const functions = {
   highlightHTMLText: (htmlContent, extractedText, extractedTextPositions) => {
      let strs = [];
      for (const position of extractedTextPositions) {
         let str = '';
         for (let i = position.start; i <= position.end; i++) {
            str += extractedText[i - 1];
         }
         strs.push({ word: str.trim(), position: position.end - 1 });
      }
      const words = extractedText.split(/\s+/);
      let strs_oc = [];

      for (const str of strs) {
         const targetWord = str.word.toLowerCase();
         let count = 0;
         let i = 0;
         for (const w of words) {
            i += w.length + 1;
            if (w.toLowerCase() === targetWord) {
               count++;
            }
            if (i > str.position + 1) {
               break;
            }
         }
         i = 0;
         strs_oc.push({ word: str.word, occ: count });
      }

      let markedString = htmlContent;
      for (const str of strs_oc) {
         let count = 0;

         const regex = new RegExp(`\\b${str.word}\\b`, 'gi');
         while ((match = regex.exec(markedString)) !== null) {
            count++;
            if (count === str.occ) {
               const start = match.index;
               const end = regex.lastIndex;
               const originalWord = markedString.slice(start, end);
               const markedWord = `<mark>${originalWord}</mark>`;
               markedString = markedString.slice(0, start) + markedWord + markedString.slice(end);
               regex.lastIndex = start + markedWord.length;
            }
         }
      }
      return markedString;
   },
   extractPlainText: (input) => {
      const regex = /<[^>]*>/g;
      const plainText = input.replace(regex, ' ').replace(/\s+/g, ' ').trim();
      return plainText;
   }
};
module.exports = functions;