import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import "cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const loader = new CheerioWebBaseLoader(
    "https://www.dropbox.com/scl/fi/9g94vascc6xs8vompr7kk/Leyte-Normal-University-LNU-Undergraduate-Student-Manual-Final-Clean.txt?rlkey=btl426s6rn66805qgjautzrix&raw=1"
  );
  const docs = await loader.load();
  
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
  });
  export const allSplits = await textSplitter.splitDocuments(docs);
  console.log(allSplits.length);
  
