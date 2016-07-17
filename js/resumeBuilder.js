var bio = {
    "name": "Sanoj Antony",
    "role": "Front-end developer",
    "contacts": {
        "mobile": "612-423-5075",
        "email": "sanojantony@gmail.com",
        "github": "https://github.com/santonica",
        "twitter": "https://mobile.twitter.com/sanojantony",
        "location": "Sunnyvale,ca"
    },
    "welcomeMessage": "Hello, Welcome to my resume page",
    "skills": ["javascript", "HTML5", "CSS3", "Sass", 'bootstrap', 'grunt', 'AngularJS', 'Knockout', 'jQuery', 'java', "Jersey", "AppDirect"],
    "biopic": "images/biopic.jpg",
    "display": displayBio
};

var education = {
    "schools": [{
        "name": "Cochin University of Science & Technology",
        "location": "Cochin, Kerala",
        "degree": "Master of Computer Applications",
        "majors": "Algorithms, Operating systems",
        "dates": "1998-2002",
        "url": "http://www.cusat.ac.in/"
    }, {
        "name": "Calicut University",
        "location": "Calicut, Kerala",
        "degree": "BSc Mathematics",
        "majors": "Mathematics, Statistics, Physics",
        "dates": "1994-1997",
        "url": "http://www.universityofcalicut.info/"
    }],
    onlineCourses: [{
        "title": "Shaping up with Angular.js",
        "school": "codeschool.com",
        "date": "",
        "url": ""
    }, {
        "title": "JavaScript Road Trip",
        "school": "codeschool.com",
        "date": "",
        "url": ""
    }, {
        "title": "Blasting Off with Bootstrap",
        "school": "codeschool.com",
        "date": "",
        "url": ""
    }, {
        "title": "Front-end Formations",
        "school": "codeschool.com",
        "date": "",
        "url": ""
    }, {
        "title": "Assembling Sass",
        "school": "codeschool.com",
        "date": "",
        "url": ""
    }],
    display: displayEducation

};

var work = {
    jobs: [{
        "employer": "FICO",
        "title": "Lead Engineer",
        "location": "San Jose, California",
        "dates": "2006-2016",
        "description": "Architected, designed and implemented solutions for market leading business rules engine, Blaze Advisor"
    }, {
        "employer": "FICO",
        "title": "Lead Engineer",
        "location": "Bangalore, India",
        "dates": "2006-2016",
        "description": "Designed and implemented next generation of Rule maintainence application with single page application architecture"
    }, {
        "employer": "Honeywell",
        "title": "Principal Engineer",
        "location": "Bangalore, India",
        "dates": "2001-2006",
        "description": ""
    }],
    display: displayWork
};

var projects = {
    projects: [{
        title: "Blaze Advisor",
        dates: "2006-2016",
        description: "Single page web application for the business rules and decision service domain. Built with YUI, jQuery, Sass, grunt",
        images: ['http://www.fico.com/sites/default/files/enterprise-fraud-security-overview_32.png']
    }, {
        title: "Decision Central",
        dates: "2015-2016",
        description: "Single page webapplication for Model management and decision asset monitoring and management. Built with knockout, sammy, jQuery",
        images: ['http://www.fico.com/sites/default/files/visual-insights-studio-solution-architecture_0.png']
    }, {

        title: "AMOSS",
        dates: "2002-2006",
        description: "Honeywell Aircraft diagnostics and prognostics domain",
        images: []
    }],
    display: displayProjects
};


function displayBio() {
    var formattedName = HTMLheaderName.replace("%data%", bio.name);
    var formattedRole = HTMLheaderRole.replace("%data%", bio.role);

    $("#header").prepend(formattedRole).prepend(formattedName);
    //$("#main").append(internationalizeButton);
    $("#mapDiv").append(googleMap);

    var topContacts = $("#topContacts");
    var footerContacts = $("#footerContacts");

    for (var item in bio.contacts) {
        if (bio.contacts.hasOwnProperty(item)) {
            topContacts.append(window["HTML" + item].replace("%data%", bio.contacts[item]));
            footerContacts.append(window["HTML" + item].replace("%data%", bio.contacts[item]));
        }
    }
    var HTMLbioPic = '<img src="%data%" class="biopic">';
    var HTMLwelcomeMsg = '<span class="welcome-message">%data%</span>';


    var picTmpl = HTMLbioPic.replace("%data%", bio.biopic);
    var welcomemsgTmpl = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
    $("#header").append(picTmpl).append(welcomemsgTmpl);
    if (bio["skills"]) {
        $("#header").append(HTMLskillsStart);
        for (var i = 0; i < bio.skills.length; i++) {
            $("#skills").append(HTMLskills.replace("%data%", bio.skills[i]));
        }
    }
    $("#header").append(HTMLDetailedskillsStart);
}

function displayWork() {

    for (var i = 0; i < work.jobs.length; i++) {
        $("#workExperience").append(HTMLworkStart);
        var lastWorkEntry = $(".work-entry:last");
        lastWorkEntry.append(HTMLworkEmployer.replace("%data%", work.jobs[i].employer) + HTMLworkTitle.replace("%data%", work.jobs[i].title));
        lastWorkEntry.append(HTMLworkLocation.replace("%data%", work.jobs[i].dates));
        lastWorkEntry.append(HTMLworkDates.replace("%data%", work.jobs[i].location));
        lastWorkEntry.append(HTMLworkDescription.replace("%data%", work.jobs[i].description));
    }
}

function displayProjects() {
    var projs = projects.projects;
    for (var i = 0; i < projs.length; i++) {
        $("#projects").append(HTMLprojectStart);
        $(".project-entry:last").append(HTMLprojectTitle.replace("%data%", projs[i].title));
        $(".project-entry:last").append(HTMLprojectDates.replace("%data%", projs[i].dates));
        $(".project-entry:last").append(HTMLprojectDescription.replace("%data%", projs[i].description));
        for (var j = 0; j < projs[i].images.length; j++) {
            $(".project-entry:last").append(HTMLprojectImage.replace("%data%", projs[i].images[j]));
        }
    }
}

function displayEducation() {
    for (var i = 0; i < education.schools.length; i++) {
        $("#education").append(HTMLschoolStart);
        var lastEducationEntry = $(".education-entry:last");
        lastEducationEntry.append(HTMLschoolName.replace("%data%", education.schools[i].name) + HTMLschoolDegree.replace("%data%", education.schools[i].degree));
        lastEducationEntry.append(HTMLschoolLocation.replace("%data%", education.schools[i].location));
        lastEducationEntry.append(HTMLschoolDates.replace("%data%", education.schools[i].dates));
        lastEducationEntry.append(HTMLschoolMajor.replace("%data%", education.schools[i].majors));
    }

    $("#education").append(HTMLonlineClasses);

    for (var j = 0; j < education.onlineCourses.length; j++) {
        $("#education").append(HTMLschoolStart);
        lastEducationEntry = $(".education-entry:last");
        lastEducationEntry.append(HTMLonlineTitle.replace("%data%", education.onlineCourses[j].title));
        lastEducationEntry.append(HTMLonlineSchool.replace("%data%", education.onlineCourses[j].school));
        lastEducationEntry.append(HTMLonlineDates.replace("%data%", education.onlineCourses[j].date));
        lastEducationEntry.append(HTMLonlineURL.replace("%data%", education.onlineCourses[j].url));
    }
}


bio.display();
work.display();
projects.display();
education.display();