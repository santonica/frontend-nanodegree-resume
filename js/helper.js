
//Namespace for Resume. Reduce globals
//helper.js should be loaded first in index.html
var com = {
    santon:{
        templates:{},
        bio:null,
        education:null,
        work:null,
        projects:null
    }
};

//IIFE for preventing global scoping variables
(function() {

    //ALL HTML Templates to be defined here.
    com.santon.templates.HTMLheaderName = '<h1 id="name">%data%</h1>';
    com.santon.templates.HTMLheaderRole = '<span>%data%</span><hr/>';

    com.santon.templates.HTMLcontactGeneric = '<li class="flex-item"><span class="orange-text">%contact%</span>' +
        '<span class="white-text">%data%</span></li>';
    com.santon.templates.HTMLmobile = '<li class="flex-item"><span class="orange-text">mobile</span><span ' +
        'class="white-text">%data%</span></li>';
    com.santon.templates.HTMLemail = '<li class="flex-item"><span class="orange-text">email</span><span ' +
        'class="white-text">%data%</span></li>';
    com.santon.templates.HTMLtwitter = '<li class="flex-item"><span class="orange-text">twitter</span><span ' +
        'class="white-text">%data%</span></li>';
    com.santon.templates.HTMLgithub = '<li class="flex-item"><span class="orange-text">github</span><span ' +
        'class="white-text">%data%</span></li>';
    com.santon.templates.HTMLblog = '<li class="flex-item"><span class="orange-text">blog</span><span ' +
        'class="white-text">%data%</span></li>';
    com.santon.templates.HTMLlocation = '<li class="flex-item"><span class="orange-text">location</span><span ' +
        'class="white-text">%data%</span></li>';

    com.santon.templates.HTMLbioPic = '<img src="%data%" class="biopic">';
    com.santon.templates.HTMLwelcomeMsg = '<span class="welcome-message">%data%</span>';

    com.santon.templates.HTMLskillsStart = '<h3 id="skills-h3">Skills at a Glance:</h3><ul id="skills" ' +
        'class="flex-box"></ul>';
    com.santon.templates.HTMLDetailedskillsStart = '<h3 id="detailedskills-h3">Detailed Skills:</h3>' +
        '<div id="skillmap"><div class="skills-wrapper"><div class="skills-sunburst"></div>' +
        '<div class="skills-chart"><div id="skills-chart-breadcrumb"></div></div> </div> </div>';
    com.santon.templates.HTMLskills = '<li class="flex-item"><span class="white-text">%data%</span></li>';

    com.santon.templates.HTMLworkStart = '<div class="work-entry"></div>';
    com.santon.templates.HTMLworkEmployer = '<a href="#">%data%';
    com.santon.templates.HTMLworkTitle = ' - %data%</a>';
    com.santon.templates.HTMLworkDates = '<div class="date-text">%data%</div>';
    com.santon.templates.HTMLworkLocation = '<div class="location-text">%data%</div>';
    com.santon.templates.HTMLworkDescription = '<p><br>%data%</p>';

    com.santon.templates.HTMLprojectStart = '<div class="project-entry"></div>';
    com.santon.templates.HTMLprojectTitle = '<a href="#">%data%</a>';
    com.santon.templates.HTMLprojectDates = '<div class="date-text">%data%</div>';
    com.santon.templates.HTMLprojectDescription = '<p><br>%data%</p>';
    com.santon.templates.HTMLprojectImage = '<img src="%data%" class="project-img">';

    com.santon.templates.HTMLschoolStart = '<div class="education-entry"></div>';
    com.santon.templates.HTMLschoolName = '<a href="#">%data%';
    com.santon.templates.HTMLschoolDegree = ' -- %data%</a>';
    com.santon.templates.HTMLschoolDates = '<div class="date-text">%data%</div>';
    com.santon.templates.HTMLschoolLocation = '<div class="location-text">%data%</div>';
    com.santon.templates.HTMLschoolMajor = '<br><em>Major: %data%</em>';


    com.santon.templates.HTMLonlineClasses = '<h3>Online Classes</h3>';
    com.santon.templates.HTMLonlineTitle = '<a href="#">%data%';
    com.santon.templates.HTMLonlineSchool = ' - %data%</a>';
    com.santon.templates.HTMLonlineDates = '<div class="date-text">%data%</div>';
    com.santon.templates.HTMLonlineURL = '<br><a href="#">%data%</a>';

    com.santon.templates.internationalizeButton = '<button>Internationalize</button>';
    com.santon.templates.googleMap = '<div id="map"></div>';


    function inName() {
        "use strict";

        var names = $('#name').html().split(" ");
        return names[0].charAt(0).toUpperCase() + names[0].substring(1) + " " + names[1].toUpperCase();
    }
    

    /*
     The International Name challenge in Lesson 2 where you'll create a function that will need this helper code
      to run. Don't delete! It hooks up your code to the button you'll be appending.
     */
    $(document).ready(function() {
        $('button').click(function() {
            var iName = inName() || function(){};
            $('#name').html(iName);
        });
    });

    /*
     The next few lines about clicks are for the Collecting Click Locations quiz in Lesson 2.
     */
    var clickLocations = [];

    function logClicks(x,y) {
        clickLocations.push(
            {
                x: x,
                y: y
            }
        );
        console.log('x location: ' + x + '; y location: ' + y);
    }

    $(document).click(function(loc) {
        logClicks(loc.pageX, loc.pageY);
    });



    /*
     This is the fun part. Here's where we generate the custom Google Map for the website.
     See the documentation below for more details.
     https://developers.google.com/maps/documentation/javascript/reference
     */
    var map;    // declares a  map variable


    /*
     Start here! initializeMap() is called when page is loaded.
     */
    function initializeMap() {

        var locations;

        var mapOptions = {
            disableDefaultUI: true
        };

        /* 
         For the map to be displayed, the googleMap var must be
         appended to #mapDiv in resumeBuilder.js. 
         */
        map = new google.maps.Map(document.querySelector('#map'), mapOptions);


        /*
         locationFinder() returns an array of every location string from the JSONs
         written for bio, education, and work.
         */
        function locationFinder() {

            // initializes an empty array
            var locations = [];

            // adds the single location property from bio to the locations array
            locations.push({ "location":com.santon.bio.contacts.location, "message": "Currently works here"});

            // iterates through school locations and appends each location to
            // the locations array
            com.santon.education.schools.forEach(function(school) {
              locations.push({ "location":school.location, "message": school.name});
            });

            // iterates through work locations and appends each location to
            // the locations array
            com.santon.work.jobs.forEach(function(job) {
                locations.push({ "location":job.location, "message": job.employer});
            });

            return locations;
        }

        /*
         createMapMarker(placeData) reads Google Places search results to create map pins.
         placeData is the object returned from search results containing information
         about a single location.
         */
        function createMapMarker(placeData) {

            // The next lines save location data from the search result object to local variables
            var lat = placeData.geometry.location.lat();  // latitude from the place service
            var lon = placeData.geometry.location.lng();  // longitude from the place service
            var name = placeData.formatted_address + "<br/>" + placeData.message;   // name of the place from the place service
            var bounds = window.mapBounds;            // current boundaries of the map window

            // marker is an object with additional data about the pin for a single location
            var marker = new google.maps.Marker({
                map: map,
                position: placeData.geometry.location,
                title: name
            });

            // infoWindows are the little helper windows that open when you click
            // or hover over a pin on a map. They usually contain more information
            // about a location.
            var infoWindow = new google.maps.InfoWindow({
                content: name
            });

            //Open an infowindow on click on the map markers
            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.open(map,marker);
            });

            // this is where the pin actually gets added to the map.
            // bounds.extend() takes in a map location object
            bounds.extend(new google.maps.LatLng(lat, lon));
            // fit the map to the new marker
            map.fitBounds(bounds);
            // center the map
            map.setCenter(bounds.getCenter());
        }

        /*
         callback(results, status) makes sure the search returned results for a location.
         If so, it creates a new map marker for that location.
         */
        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                results[0].message = this.message; //Retrieve the bound object's message
                createMapMarker(results[0]);
            }
        }

        /*
         pinPoster(locations) takes in the array of locations created by locationFinder()
         and fires off Google place searches for each location
         */
        function pinPoster(locations) {

            // creates a Google place search service object. PlacesService does the work of
            // actually searching for location data.
            var service = new google.maps.places.PlacesService(map);

            // Iterates through the array of locations, creates a search object for each location
            locations.forEach(function(place) {

                // the search request object
                var request = {
                    query: place.location
                };

                // Actually searches the Google Maps API for location data and runs the callback
                // function with the search results after each search.
                service.textSearch(request, callback.bind(place));
            });
        }

        // Sets the boundaries of the map based on pin locations
        window.mapBounds = new google.maps.LatLngBounds();

        // locations is an array of location strings returned from locationFinder()
        locations = locationFinder();

        // pinPoster(locations) creates pins on the map for each location in
        // the locations array
        pinPoster(locations);

    }



    // Calls the initializeMap() function when the page loads
    window.addEventListener('load', initializeMap);

    // Vanilla JS way to listen for resizing of the window
    // and adjust map bounds
    window.addEventListener('resize', function(e) {
        //Make sure the map bounds get updated on page resize
        map.fitBounds(mapBounds);
    });
    
}());


