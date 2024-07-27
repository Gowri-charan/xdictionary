import React, { useState } from 'react';

function DictionaryApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [definition, setDefinition] = useState('');

  const handleSearch = async () => {
    try {
      // Replace 'YOUR_API_KEY' with your actual API key
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`, {
        headers: {
          'apikey': 'YOUR_API_KEY'
        }
      });

      const data = await response.json();

      if (data.length > 0) {
        // Extract the definition from the API response
        const extractedDefinition = data[0].meanings[0].definitions[0].definition;
        setDefinition(extractedDefinition);
      } else {
        setDefinition('No definition found.');
      }
    } catch (error) {
      setDefinition('Error fetching definition.');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Dictionary App</h1>
      <div>
        <input
          type="text"
          placeholder="Component"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <h2>Definition:</h2>
      <p>{definition}</p>
    </div>
  );
}

export default DictionaryApp;