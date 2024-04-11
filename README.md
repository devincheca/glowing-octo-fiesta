# Pet Docs
Sample Pet App

I went with React and Node since those were common technologies that I felt comfortable with to satisfy all the requirements. The additional feature I added that I thought would be useful/cool is a search bar to filter for what you need.

the site can be viewed at: https://novellia.devincheca.com

the admin site can be viewed at: https://novellia.devincheca.com/?isAdmin=true

new document types can be added in admin, and all pets in the system can be seen there

to run locally:
- cd pet-docs
- npm ci
- npm start
- app will be available at localhost:3000

serverless AWS Lambda code can be seen at index.mjs

How and why you modeled the data structure(s) the way you did
- I modeled the data structure separately because pets, documents, and document types needed to be separated for each view. I kept the data somewhat normalized to reflect the UI so I would not have to precompute anything on the backend for time constraints. If there was more time I might precompute the my pets view for better scalability.

How and why you structured your API(s)
- I went with REST because I knew I could generate a lambda function quickly in AWS to create this mock-up.

How and why you decided on the page(s) you built
- I knew that I needed a means of adding and showing these separate tables on the backend. To put them all on one page would be too much, so I separated them.

What improvements you’d make if you want to build this for real
- I would improve the backend structure to be more performant with precomputed views to reduce the backend workload. I would also add authentication so that the data persistence is better. I would also split the components up more so the files for the pages are not so big. I would also add a router to support URL navigation.
