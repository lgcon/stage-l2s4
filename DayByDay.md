

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
- Try the API rest TODO


