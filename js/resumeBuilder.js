/**
 * <p>Defining bio object</p>
 * @type {{name: string, role: string, contacts: {mobile: string, email: string, github: string, 
 * twitter: string, location: string}, welcomeMessage: string, skills: string[], biopic: string}}
 */
com.santon.bio = {
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
    "skills": ["javascript", "HTML5", "CSS3", "Sass", 'bootstrap', 'grunt', 'AngularJS', 'Knockout', 'jQuery', 
        'java', "Jersey", "AppDirect"],
    "biopic": "images/biopic.jpg"
};

/**
 * <p>Defining education object</p>
 * @type {{schools: *[], onlineCourses: *[]}}
 */
com.santon.education = {
    "schools": [{
        "name": "Cochin University of Science & Technology",
        "location": "Cochin, Kerala",
        "degree": "Master of Computer Applications",
        "majors": ["Algorithms", "Operating systems"],
        "dates": "1998-2002",
        "url": "http://www.cusat.ac.in/"
    }, {
        "name": "Calicut University",
        "location": "Calicut, Kerala",
        "degree": "BSc Mathematics",
        "majors": ["Mathematics", "Statistics", "Physics"],
        "dates": "1994-1997",
        "url": "http://www.universityofcalicut.info/"
    }],
    onlineCourses: [{
        "title": "Shaping up with Angular.js",
        "school": "codeschool.com",
        "dates": "2016-2016",
        "url": "https://www.codeschool.com/"
    }, {
        "title": "JavaScript Road Trip",
        "school": "codeschool.com",
        "dates": "2016-2016",
        "url": "https://www.codeschool.com/"
    }, {
        "title": "Blasting Off with Bootstrap",
        "school": "codeschool.com",
        "dates": "2016-2016",
        "url": "https://www.codeschool.com/"
    }, {
        "title": "Front-end Formations",
        "school": "codeschool.com",
        "dates": "2016-2016",
        "url": "https://www.codeschool.com/"
    }, {
        "title": "Assembling Sass",
        "school": "codeschool.com",
        "dates": "2016-2016",
        "url": "https://www.codeschool.com/"
    }]
};

/**
 * <p>Defining work object</p>
 * @type {{jobs: *[]}}
 */
com.santon.work = {
    jobs: [{
        "employer": "FICO",
        "title": "Lead Engineer",
        "location": "San Jose, California",
        "dates": "2006-2016",
        "description": "Architected, designed and implemented solutions for market leading business rules engine," +
        " Blaze Advisor"
    }, {
        "employer": "FICO",
        "title": "Lead Engineer",
        "location": "Bangalore, India",
        "dates": "2006-2016",
        "description": "Designed and implemented next generation of Rule maintainence application with single page" +
        " application architecture"
    }, {
        "employer": "Honeywell",
        "title": "Principal Engineer",
        "location": "Bangalore, India",
        "dates": "2001-2006",
        "description": "Designed and implemented the Web interface for Honeywell AMOSS and PTM"
    }]
};

/**
 * <p>Defining projects object</p>
 * @type {{projects: *[]}}
 */
com.santon.projects = {
    projects: [{
        title: "Blaze Advisor",
        dates: "2006-2016",
        description: "Single page web application for the business rules and decision service domain. Built with " +
        "YUI, jQuery, Sass, grunt",
        images: ['http://www.fico.com/sites/default/files/enterprise-fraud-security-overview_32.png']
    }, {
        title: "Decision Central",
        dates: "2015-2016",
        description: "Single page webapplication for Model management and decision asset monitoring and management. " +
        "Built with knockout, sammy, jQuery",
        images: ['http://www.fico.com/sites/default/files/visual-insights-studio-solution-architecture_0.png']
    }, {

        title: "AMOSS",
        dates: "2002-2006",
        description: "Honeywell Aircraft diagnostics and prognostics domain",
        images: ['http://www51.honeywell.com/aero/technology/common/images/ias_big.jpg']
    }]
};

/**
 * <p>Display function for Bio</p>
 */
com.santon.bio.display = function () {
    "use strict";

    var formattedName = com.santon.templates.HTMLheaderName.replace("%data%", this.name);
    var formattedRole = com.santon.templates.HTMLheaderRole.replace("%data%", this.role);

    $("#header").prepend(formattedRole).prepend(formattedName);
    //$("#main").append(internationalizeButton);
    $("#mapDiv").append(com.santon.templates.googleMap);

    var topContacts = $("#topContacts");
    var footerContacts = $("#footerContacts");

    for (var item in this.contacts) {
        if (this.contacts.hasOwnProperty(item)) {
            topContacts.append(com.santon.templates["HTML" + item].replace("%data%", this.contacts[item]));
            footerContacts.append(com.santon.templates["HTML" + item].replace("%data%", this.contacts[item]));
        }
    }
    com.santon.templates.HTMLbioPic = '<img src="%data%" class="biopic">';
    com.santon.templates.HTMLwelcomeMsg = '<span class="welcome-message">%data%</span>';


    var picTmpl = com.santon.templates.HTMLbioPic.replace("%data%", this.biopic);
    var welcomemsgTmpl = com.santon.templates.HTMLwelcomeMsg.replace("%data%", this.welcomeMessage);
    $("#header").append(picTmpl).append(welcomemsgTmpl);
    if (this.skills) {
        $("#header").append(com.santon.templates.HTMLskillsStart);
        this.skills.forEach(function (skill) {
            $("#skills").append(com.santon.templates.HTMLskills.replace("%data%", skill));
        });
    }
    $("#header").append(com.santon.templates.HTMLDetailedskillsStart);
};

/**
 * <p>Display function for Work</p>
 */
com.santon.work.display = function () {
    "use strict";

    this.jobs.forEach(function (job) {
        $("#workExperience").append(com.santon.templates.HTMLworkStart);
        var lastWorkEntry = $(".work-entry:last");
        lastWorkEntry.append(com.santon.templates.HTMLworkEmployer.replace("%data%",
                job.employer) + com.santon.templates.HTMLworkTitle.replace("%data%", job.title));
        lastWorkEntry.append(com.santon.templates.HTMLworkLocation.replace("%data%", job.dates));
        lastWorkEntry.append(com.santon.templates.HTMLworkDates.replace("%data%", job.location));
        lastWorkEntry.append(com.santon.templates.HTMLworkDescription.replace("%data%", job.description));
    });
};


/**
 * <p>Display function for projects</p>
 */
com.santon.projects.display = function () {
    "use strict";

    this.projects.forEach(function (project) {
        $("#projects").append(com.santon.templates.HTMLprojectStart);
        $(".project-entry:last").append(com.santon.templates.HTMLprojectTitle.replace("%data%", project.title));
        $(".project-entry:last").append(com.santon.templates.HTMLprojectDates.replace("%data%", project.dates));
        $(".project-entry:last").append(com.santon.templates.HTMLprojectDescription.replace("%data%",
            project.description));
        project.images.forEach(function (image) {
            $(".project-entry:last").append(com.santon.templates.HTMLprojectImage.replace("%data%", image));
        });
    });
};

/**
 * <p>Display function for education</p>
 */
com.santon.education.display = function () {
    "use strict";
    this.schools.forEach(function (school) {
        $("#education").append(com.santon.templates.HTMLschoolStart);
        var lastEducationEntry = $(".education-entry:last");
        lastEducationEntry.append(com.santon.templates.HTMLschoolName.replace("%data%",
                school.name) + com.santon.templates.HTMLschoolDegree.replace("%data%", school.degree));
        lastEducationEntry.append(com.santon.templates.HTMLschoolLocation.replace("%data%", school.location));
        lastEducationEntry.append(com.santon.templates.HTMLschoolDates.replace("%data%", school.dates));
        school.majors.forEach(function (major) {
            lastEducationEntry.append(com.santon.templates.HTMLschoolMajor.replace("%data%", major));
        });
    });

    $("#education").append(com.santon.templates.HTMLonlineClasses);

    this.onlineCourses.forEach(function (onlineCourse) {
        $("#education").append(com.santon.templates.HTMLschoolStart);
        var lastEducationEntry = $(".education-entry:last");
        lastEducationEntry.append(com.santon.templates.HTMLonlineTitle.replace("%data%",
                onlineCourse.title) + com.santon.templates.HTMLonlineSchool.replace("%data%", onlineCourse.school));
        lastEducationEntry.append(com.santon.templates.HTMLonlineDates.replace("%data%", onlineCourse.dates));
        lastEducationEntry.append(com.santon.templates.HTMLonlineURL.replace("%data%", onlineCourse.url));
    });
};

/**
 * <p>Render all objects</p>
 */

com.santon.bio.display();
com.santon.work.display();
com.santon.projects.display();
com.santon.education.display();