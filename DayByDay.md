

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
- Is there a sql vulnerability when checking the auth token on nm ? (note that postgres comments are not escaped)
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






