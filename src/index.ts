// 1.  Download a file from:  http://www.gutenberg.org/files/2701/2701-0.txt
// 2.  Test drive cracking the file open, parse it and get a list of the top 50 words
// 3.  Exclude a set of common words (case insensitive)
// 4.  the,of,to,and,a,in,is,it,you,that,he,was,for,on,are,with,as,I,his,they,be,at,one,have,this,from,or,had,by,not,word,but,what,some,we,can,out,other,were,all,there,when,up,use,your,how,said,an,each,she
// 5.  Deploy and run this on one of cloud platforms - AWS/Azure/GCP5)
// 6.  Check the code into GitHub and Share the link 

// Because of the file being large, use a stream to read the file and not use up memory by storing the entire file in memory while reading.

const fs = require('fs');

async function readFile() {
    let top50: string[] = []; // when we reach a max of 50 length, thats it
    let hashMap: {} = {}

    // Create a readable stream
    const readableStream = fs.createReadStream('./data/2701-0.txt', { encoding: 'utf8' });

    // Handle errors
    readableStream.on('error', (error: any) => {
        console.error('Error:', error);
    });

    // Read data from the stream
    readableStream.on('data', (chunk: any) => {
        // Read thru the file
        // Reading append hashmap with the word to keep track of the count for each word
        console.log(chunk);
    });

    // Handle end of stream
    readableStream.on('end', () => {
        console.log('End of stream');
    });

    return top50
}

readFile();