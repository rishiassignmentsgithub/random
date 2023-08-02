function highlightHTMLText(htmlContent, extractedText, extractedTextPositions) {
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

}

function extractPlainText(input) {
   const regex = /<[^>]*>/g;
   const plainText = input.replace(regex, ' ').replace(/\s+/g, ' ').trim();
   return plainText;
}

const htmlContent = '<p><span>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar…<br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>';
const extractedText = extractPlainText(htmlContent);

const extractedTextPositions = [
   {
      start: 241,
      end: 247,
   },
   {
      start: 518,
      end: 525,
   },
]

const highlightedHTML = highlightHTMLText(htmlContent, extractedText, extractedTextPositions);
console.log(highlightedHTML);

