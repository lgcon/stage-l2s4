

##### Day -3 to -1

- Trying Angular 2 vs React
- Choosing React, main reasons: ligth, library oriented, UNIX philosofy, easy to use and read
- Made a first simple example of React app for autocopleting form


##### Day 1

- Set up debian
  - Dealing with asus UEFI firmware

- Install and configure netmagis
	- Configure postgres
	- Configure apache2

- Exploring netmagis
	- Found xss in netmagis

##### Day 2

- Better understanding of netmagis architecture
	- Netmagis modules
	- Permission system
	- Concerns related to the rest migration (branch rest on github)

- Rest API intenationalization: analyzing the most popular solutions

	| Facebook Graph  |     Amazon     | (many) others  |
	| --------------- | -------------- | -------------- |
	| 'locale' param  |  Sub-domains   | Http headers   |

- Suggestions:
	- For interactive autocomplete dispatched on the onchange event: 'limit' parameter
	- Case of use:
		1. User starts to fill a field
		2. No param available so far: request --> limit = value
		3. Client completes the fields with corresponding values
	- Still an issue: data is not avalable insed the given limit
		- Selective API? Chained requests? 
	- Best solution: use wildcard in parameters + limit parameter

##### Day 3

- Set up a netmagis environement on a virtual machine at home (TODO complete)
- Set up rest branch of netmagis
	- Set up a nginx server
	- Config postgres

- Install ssh server
- Try netmagis API

#### Day 4

- Analysis of the forms of the web client in relation to is database
- Filter fields used in the web client
- Find API corrispondence


#### Weekend

- Searching for a transpiller I just realized there are two languages called JSX...
- Does using react + react-dom + browserify packages add innecessary complexity to the project?
- Trying babel transpiller (and realizing that ES6 is pretty cool...unsafe maybe, but cool)
- I finally choosed to use webpack to build the app.
- First test on netmagis (just autocomplete)
- Bringing a bit of genericity to the app:
	- Use a named div and a function named getSuggestion_name (where name is the name of the div)
	- All the properties are passed from the div

#### Day 5
- The function to get the cidr is ready...I fially choose to use one only async call when the page is loaded
	- It's much faster and smooth
	- Every time a network is added the page is likely to be reloaded
- Put the app togheter with the UI
- Dealing with the "I cannot send your cookies to another domain" problem

#### Day 6
- Dealing with the "I cannot send your cookies to your parent directory" problem
	- After half hour playing with nginx location/root/alias directives I just choosed the set the
	  session cookie manually on the root :D
- Using the same database with both the old and the newer (under dev) versions of netmagis
- The austosuggest component works well togheter with async ajax requestes

#### Day 7
- Starting to work on the 'add' interface
- Created the Tabs component 

#### Day 8
- Internationalization...issues:
	1) Using json files or using imports ?
	2) Must be easy to use with the other components
	3) Must be secure (should not fail during the execution
	   if a language/translation is missing)
	4) Components must be (more or less) indipendent
	5) Must be able to change language at run time
	  (this would be handy if the whole web site will finally
	   be entirely rendered as an app )
	6) Performance



#### Day 9
- I18n is a reality:
	1) Finally I will use json files loaded async. .
	   This system will be super easy to maintain/update and
	   will not rely on any hidden feature of webpack in order
	   to gain in size. Furthermore if the whole website will
	   finally be an unique app this will avoid a bunch of problems
	   dues to the size of the whole object/translations
	2) I made it super easy to use. Components must just be wrapped
	   with the Translator component and declare their context in 
	   order to trigger a re-rendering when Translator changes it.
	   Every string that needs to be translated must pass trough the 
	   function translate.
	3) If any error the default string (english) given by the component
	   is used.
	4) Components are completely indipendent from the component Translator.
	   If they are not wrapped they will not perform any translation.
	5) The function updateTranslation deals with it, at run time ;) 
	6) As the json files are loaded async. the performances are just fine.

#### Weekend
- Writing a bit of documentation
- Making tabs always keep the values of not-rendered panels
- Simplesuggester has been generalized in the component AutoInput
- Writing a small and easy2use bootstrap-react lib
	   






