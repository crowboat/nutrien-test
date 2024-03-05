// 1.  Download a file from:  http://www.gutenberg.org/files/2701/2701-0.txt
// 2.  Test drive cracking the file open, parse it and get a list of the top 50 words
// 3.  Exclude a set of common words (case insensitive)
// 4.  the,of,to,and,a,in,is,it,you,that,he,was,for,on,are,with,as,I,his,they,be,at,one,have,this,from,or,had,by,not,word,but,what,some,we,can,out,other,were,all,there,when,up,use,your,how,said,an,each,she
// 5.  Deploy and run this on one of cloud platforms - AWS/Azure/GCP5)
// 6.  Check the code into GitHub and Share the link 

// Because of the file being large, use a stream to read the file and not use up memory by storing the entire file in memory while reading.

const fs = require('fs');

function readFile() {
    const wordCount = {};
    let top50 = [];
    // Create a readable stream
    const readableStream = fs.createReadStream('./data/2701-0.txt', { encoding: 'utf8' });

    // Handle errors
    readableStream.on('error', (error) => {
        console.error('Error:', error);
    });

    // Read data from the stream
    readableStream.on('data', (chunk) => {
        const words = chunk.split(/\s+/);
        // Split text into words and count
        words.forEach(word => {
            const sanitizedWord = word.toLowerCase().replace(/[.,!?]/g, ''); // Remove punctuation and convert to lowercase
            if (sanitizedWord !== '') {
                wordCount[sanitizedWord] = (wordCount[sanitizedWord] || 0) + 1;
            }
        });
    });

    // Handle end of stream
    readableStream.on('end', () => {
        // get hashmap entries of key, value into an array
        const wordCountArray = Object.entries(wordCount);

        // sort by count largest to smallest
        wordCountArray.sort((a, b) => b[1] - a[1]);

        // top 50 used words
        const topWordsArray = [];
        for (let i = 0; i < Math.min(wordCountArray.length, 50); i++) {
            topWordsArray.push(wordCountArray[i][0]);
        }

        top50 = topWordsArray;

        console.log(top50)
    });
}

readFile();