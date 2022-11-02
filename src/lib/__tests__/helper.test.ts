import {
  extractKeywordsFromString,
  extractTextFromHTML,
  getFilteredKeywordList,
  hightlightKeywords,
  openGraph,
  removeKeywordHighlights,
} from '@/lib/helper';

describe('Open Graph function should work correctly', () => {
  it('should not return templateTitle when not specified', () => {
    const result = openGraph({
      description: 'Test description',
      siteName: 'Test site name',
    });
    expect(result).not.toContain('&templateTitle=');
  });

  it('should return templateTitle when specified', () => {
    const result = openGraph({
      templateTitle: 'Test Template Title',
      description: 'Test description',
      siteName: 'Test site name',
    });
    expect(result).toContain('&templateTitle=Test%20Template%20Title');
  });
});

describe('extractTextFromHTML()', () => {
  it('should extract text correctly for valid html', () => {
    const html = "<div class='test'>Hello I am <span>Edward</span></div>";
    const result = extractTextFromHTML(html);
    expect(result).toContain('Hello I am Edward');
  });
  it('should extract text correctly for invalid html', () => {
    const html = `<div class='test'>Hello I  am <span>Edward</span><p></p><div>.   Testing > 13 </div>`;
    const result = extractTextFromHTML(html);
    expect(result).toContain('Hello I am Edward. Testing > 13');
  });
  it('should extract text correctly for multiline html', () => {
    const html = `<div class='test'>Hello I  am <span>Edward</span>
        <p></p><div>.   Testing > 13 
        </div>`;
    const result = extractTextFromHTML(html);
    expect(result).toContain('Hello I am Edward . Testing > 13');
  });
});

describe('filterKeywordList()', () => {
  it('return the list of filtered keywords', () => {
    const oriKeywordArray = [
      'at',
      'least',
      '5',
      'years',
      'of',
      'web',
      'development',
      'experience',
      '4',
      'in',
      'senior',
      'position',
    ];
    const blacklist = [
      'at',
      'least',
      'years',
      'of',
      'experience',
      'in',
      'position',
    ];
    const result = getFilteredKeywordList(oriKeywordArray, blacklist);
    expect(result).toEqual(['5', 'web', 'development', '4', 'senior']);
  });
  it('return empty array when no keywords are valid', () => {
    const oriKeywordArray = [
      'at',
      'least',
      '5',
      'years',
      'of',
      'web',
      'development',
      'experience',
      '4',
      'in',
      'senior',
      'position',
    ];
    const blacklist = [
      'at',
      'least',
      '5',
      'years',
      'of',
      'web',
      'development',
      'experience',
      '4',
      'in',
      'senior',
      'position',
    ];
    const result = getFilteredKeywordList(oriKeywordArray, blacklist);
    expect(result).toEqual([]);
  });
  it('return the list of filtered keywords based on the stopwords database', () => {
    const oriKeywordArray = [
      'at',
      'least',
      '5',
      'years',
      'of',
      'web',
      'development',
      'experience',
      '4',
      'in',
      'senior',
      'position',
    ];
    const result = getFilteredKeywordList(oriKeywordArray);
    expect(result).toEqual([
      '5',
      'web',
      'development',
      'experience',
      '4',
      'senior',
      'position',
    ]);
  });
});

describe('extractKeywordsFromString()', () => {
  it('return the full list of array of keywords', () => {
    const text =
      "At least 5 years of web development experience! +4 in senior position web-development don't.";
    const result = extractKeywordsFromString(text);
    expect(result).toEqual([
      'at',
      'least',
      '5',
      'years',
      'of',
      'web',
      'development',
      'experience',
      '4',
      'in',
      'senior',
      'position',
      'web-development',
      "don't",
    ]);
  });
  it('return the full list of array of keywords without duplicates', () => {
    const text =
      'At least 5 years of web development senior position experience! +4 in senior web developer position.';
    const result = extractKeywordsFromString(text);
    expect(result).toEqual([
      'at',
      'least',
      '5',
      'years',
      'of',
      'web',
      'development',
      'senior',
      'position',
      'experience',
      '4',
      'in',
      'developer',
    ]);
  });
  it('return an empty array for no keywords', () => {
    const text = '=!+._^%$';
    const result = extractKeywordsFromString(text);
    expect(result).toEqual([]);
  });
});

describe('highlightKeywords()', () => {
  it('return a string with keywords enclosed with ==', () => {
    const text = 'Hello, how are you?';
    const keywords = ['Hello', 'you'];
    const result = hightlightKeywords(text, keywords);
    expect(result).toEqual('==Hello==, how are ==you==?');
  });
  it('correctly highlights keywords that appear more than once', () => {
    const text = 'Hello you, how are you?';
    const keywords = ['Hello', 'you'];
    const result = hightlightKeywords(text, keywords);
    expect(result).toEqual('==Hello== ==you==, how are ==you==?');
  });
  it('returns the original sentence when no keywords are matched', () => {
    const text = 'How am I?';
    const keywords = ['Hello', 'you'];
    const result = hightlightKeywords(text, keywords);
    expect(result).toEqual('How am I?');
  });
  it('correctly highlights keywords (no partial match)', () => {
    const text = 'HelloKitty yourself you Kittyhello?';
    const keywords = ['Hello', 'you'];
    const result = hightlightKeywords(text, keywords);
    expect(result).toEqual('HelloKitty yourself ==you== Kittyhello?');
  });
});

describe('removeKeywordHighlights()', () => {
  it('return a string with keywords highlights removed', () => {
    const text = "==Hello==, how are ==you== ==edward-web== ==don't==?";
    const result = removeKeywordHighlights(text);
    expect(result).toEqual("Hello, how are you edward-web don't?");
  });
  it('return original string if no highlights found', () => {
    const text = 'Hello you, how are you?';
    const result = removeKeywordHighlights(text);
    expect(result).toEqual('Hello you, how are you?');
  });
  it('return original string with 3 equal signs in a row', () => {
    const text = '=== hello';
    const result = removeKeywordHighlights(text);
    expect(result).toEqual('=== hello');
  });
});
