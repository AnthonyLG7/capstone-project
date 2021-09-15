'use strict'

let express = require('express')
let bodyParser = require('body-parser')
let fs = require('fs')

let app = express()
app.use(bodyParser.json())

// Create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false })

// enable CORS
// Since we're not serving pages from Node, you'll get the following error if CORS isn't "enabled"
// Error:  Failed to load http://localhost:3000/login/:
// No 'Access-Control-Allow-Origin' header is present on the requested resource.
// Origin 'null' is therefore not allowed access.
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, GET, DELETE, OPTIONS'
    )
    // allow preflight
    if (req.method === 'OPTIONS') {
        res.send(200)
    } else {
        next()
    }
})

// ------ Debugging support ------------------

function logArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i])
    }
}

// ------ Get next ID helper ------------------

function getNextId(counterType) {
    // use 'group' or 'member' or 'user' as counterType
    // read the counter file
    let data = fs.readFileSync(__dirname + '/data/counters.json', 'utf8')
    data = JSON.parse(data)

    // find the next id from the counters file and then increment the
    // counter in the file to indicate that id was used
    let id = -1
    switch (counterType.toLowerCase()) {
        case 'group':
            id = data.nextGroup
            data.nextGroup++
            break
        case 'member':
            id = data.nextMember
            data.nextMember++
            break
        case 'user':
            id = data.nextUser
            data.nextUser++
            break
        case 'organization':
            id = data.nextOrganization
            data.nextOrganization++
            break
        case 'coach':
            id = data.nextCoach
            data.nextCoach++
            break
    }

    // save the updated counter
    fs.writeFileSync(__dirname + '/data/counters.json', JSON.stringify(data))

    return id
}

// ------ Validation helpers ------------------

function isValidGroup(team) {
    if (team.GroupName == undefined || team.GroupName.trim() == '') return 1
    if (team.SponsorName == undefined || team.SponsorName.trim() == '') return 2
    if (team.SponsorPhone == undefined || team.SponsorPhone.trim() == '')
        return 3
    if (team.SponsorEmail == undefined || team.SponsorEmail.trim() == '')
        return 4
    // if (team.MaxGroupSize == undefined || isNaN(team.MaxGroupSize)) return 5

    return -1
}

function isValidMember(member) {
    if (member.MemberEmail == undefined || member.MemberEmail.trim() == '')
        return 1
    if (member.MemberName == undefined || member.MemberName.trim() == '')
        return 2
    if (member.MemberPhone == undefined || member.MemberPhone.trim() == '')
        return 3

    return -1
}

function isValidCoach(coach) {
    if (
        coach.OrganizationName == undefined ||
        coach.OrganizationName.trim() == ''
    )
        return 1
    if (coach.CoachName == undefined || coach.CoachName.trim() == '') return 2
    if (
        coach.CoachPhoneNumber == undefined ||
        coach.CoachPhoneNumber.trim() == ''
    )
        return 3
    if (coach.CoachId == undefined || coach.CoachId.trim() == '') return 4

    return -1
}

function isValidOrganization(organization) {
    if (
        organization.OrganizationName == undefined ||
        organization.OrganizationName.trim() == ''
    )
        return 1
    if (
        organization.CoachName == undefined ||
        organization.CoachName.trim() == ''
    )
        return 2
    if (
        organization.CoachPhoneNumber == undefined ||
        organization.CoachPhoneNumber.trim() == ''
    )
        return 3
    return -1
}

// ------------------------------------------------------------------------------

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/' + 'index.html')
})

app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + '/public/' + 'index.html')
})

// ------------------------------------------------------------------------------
// THIS CODE ALLOWS REQUESTS FOR THE API THROUGH

/* ************************************************************************* */
// NOTE:  To make debugging easy, these methods echo their processing through
//        to the terminal window.  This means there may be some unnecessary
//        parsing and stringifying.  But it is worth it as you debug your code.
/* ************************************************************************* */

// GET ORGANIZATION
app.get('/api/organizations', function (req, res) {
    console.log('Received a GET request for all organizations')

    let data = fs.readFileSync(__dirname + '/data/organizations.json', 'utf8')
    data = JSON.parse(data)

    console.log('Returned data is: ')
    console.log(data)
    res.end(JSON.stringify(data))
})

// GET ALL COACHES
app.get('/api/coaches', function (req, res) {
    console.log('Received a GET request for all coaches')

    let data = fs.readFileSync(__dirname + '/data/coaches.json', 'utf8')
    data = JSON.parse(data)

    console.log('Returned data is: ')
    console.log(data)
    res.end(JSON.stringify(data))
})
//GET ALL PLAYERS
app.get('/api/players', function (req, res) {
    console.log('Received a GET request for all players')

    let data = fs.readFileSync(__dirname + '/data/members.json', 'utf8')
    data = JSON.parse(data)

    console.log('Returned data is: ')
    console.log(data)
    res.end(JSON.stringify(data))
})

// GET ALL GROUPS
app.get('/api/groups', function (req, res) {
    console.log('Received a GET request for all groups')

    let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
    data = JSON.parse(data)

    console.log('Returned data is: ')
    console.log(data)
    res.end(JSON.stringify(data))
})
// GET ONE ORGANIZATION BY ID
app.get('/api/organizations/:id', function (req, res) {
    let id = req.params.id
    console.log('Received a GET request for organization ' + id)

    let data = fs.readFileSync(__dirname + '/data/organizations.json', 'utf8')
    data = JSON.parse(data)

    let match = data.find((element) => element.OrganizationId == id)
    if (match == null) {
        res.status(404).send('Group Not Found')
        return
    }

    console.log('Returned data is: ')
    console.log(match)
    res.end(JSON.stringify(match))
})

// GET COACHES BY TEAM
app.get('/api/coaches/:id', function (req, res) {
    let id = req.params.id
    console.log('Received a GET request for coaches with organization ' + id)

    let data = fs.readFileSync(__dirname + '/data/coaches.json', 'utf8')
    data = JSON.parse(data)

    let match = data.find((element) => element.CoachId == id)
    if (match == null) {
        res.status(404).send('Coach Not Found')
        return
    }

    console.log('Returned data is: ')
    console.log(match)
    res.end(JSON.stringify(match))
})

// GET MEMBER In MEMBER
app.get('/api/members/:memberId', function (req, res) {
    let memberId = req.params.memberId
    console.log('Received a GET request for a member in member.json')

    let data = fs.readFileSync(__dirname + '/data/members.json', 'utf8')
    data = JSON.parse(data)

    let match = data.find((element) => element.MemberId == memberId)
    if (match == null) {
        res.status(404).send('Member Not Found')
        return
    }

    console.log('Returned data is: ')
    console.log(match)
    res.end(JSON.stringify(match))
})

// GET ONE GROUP BY ID
app.get('/api/groups/:id', function (req, res) {
    let id = req.params.id
    console.log('Received a GET request for group ' + id)

    let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
    data = JSON.parse(data)

    let match = data.find((element) => element.GroupId == id)
    if (match == null) {
        res.status(404).send('Group Not Found')
        return
    }

    console.log('Returned data is: ')
    console.log(match)
    res.end(JSON.stringify(match))
})

// GET MANY GROUPS BY ORGANIZATION
app.get('/api/groups/byorganization/:id', function (req, res) {
    let id = req.params.id
    let matchingGroups = []
    console.log('Received a GET request for groups in organization ' + id)

    let orgData = fs.readFileSync(
        __dirname + '/data/organizations.json',
        'utf8'
    )
    orgData = JSON.parse(orgData)

    let organization = orgData.find(
        (element) => element.OrganizationId.toLowerCase() == id.toLowerCase()
    )
    if (organization == null) {
        res.status(404).send('Organization Not Found')
        return
    }

    let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
    data = JSON.parse(data)

    // find the matching groups for a specific organization
    let matches = data.filter((element) => {
        element.Organizations == organization.OrganizationName
        //console.log(element.Organizations)
    })
    console.log(matches)
    for (let key in data) {
        for (let key2 in data[key].Organizations) {
            if (
                data[key].Organizations[key2].OrganizationId ==
                organization.OrganizationId
            ) {
                matchingGroups.push(data[key])
                console.log('logging data: ' + data[key].Organizations[key2])
            }
        }
    }

    console.log('Returned data is: ')
    console.log(matchingGroups)
    res.end(JSON.stringify(matchingGroups))
})
// GET A SPECIFIC ORGANIZATION IN A SPECIFIC GROUP
app.get('/api/groups/:groupid/organizations/:orgid', function (req, res) {
    let groupId = req.params.groupid
    let orgId = req.params.orgid
    console.log(
        'Received a GET request for organization ' +
            orgId +
            ' in group ' +
            groupId
    )

    let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
    data = JSON.parse(data)

    // find the group
    let matchingGroup = data.find((element) => element.GroupId == groupId)
    if (matchingGroup == null) {
        res.status(404).send('Group Not Found')
        return
    }

    // find the organization
    let matchingOrg = matchingGroup.Organizations.find(
        (element) => element.OrganizationId == orgId
    )
    if (matchingOrg == null) {
        res.status(404).send('Organization Not Found')
        return
    }

    console.log('Returned data is: ')
    console.log(matchingOrg)
    res.end(JSON.stringify(matchingOrg)).contentType('application/json')
})

// GET A SPECIFIC MEMBER IN A SPECIFIC GROUP
app.get(
    '/api/groups/:groupid/organizations/:orgid/members/:memberid',
    function (req, res) {
        let groupId = req.params.groupid
        let orgId = req.params.orgid
        let memberId = req.params.memberid
        console.log(
            'Received a GET request for member ' +
                memberId +
                ' in group ' +
                groupId
        )

        let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
        data = JSON.parse(data)

        // find the group
        let matchingGroup = data.find((element) => element.GroupId == groupId)
        if (matchingGroup == null) {
            res.status(404).send('Group Not Found')
            return
        }

        // find the organization
        let matchingOrg = matchingGroup.Organizations.find(
            (element) => element.OrganizationId == orgId
        )
        if (matchingOrg == null) {
            res.status(404).send('Organization Not Found')
            return
        }

        // find the member
        let match = matchingOrg.Members.find((m) => m.MemberId == memberId)
        if (match == null) {
            res.status(404).send('Member Not Found')
            return
        }

        console.log('Returned data is: ')
        console.log(match)
        res.end(JSON.stringify(match))
    }
)

// GET ALL ORgs IN A SPECIFIC GROUP
app.get('/api/groups/:groupid/organizations', function (req, res) {
    let groupId = req.params.groupid
    console.log(
        'Received a GET request for  all organizations ' +
            ' in group ' +
            groupId
    )

    let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
    data = JSON.parse(data)

    // find the group
    let matchingGroup = data.find((element) => element.GroupId == groupId)
    if (matchingGroup == null) {
        res.status(404).send('Group Not Found')
        return
    }

    console.log('Returned data is: ')
    console.log(matchingGroup.Organizations)
    res.end(JSON.stringify(matchingGroup.Organizations))
})

// GET ALL MEMBERs IN A SPECIFIC GROUP
app.get(
    '/api/groups/:groupid/organizations/:orgid/members',
    function (req, res) {
        let groupId = req.params.groupid
        let orgId = req.params.orgid
        console.log(
            'Received a GET request for  all members ' + ' in group ' + groupId
        )

        let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
        data = JSON.parse(data)

        // find the group
        let matchingGroup = data.find((element) => element.GroupId == groupId)
        if (matchingGroup == null) {
            res.status(404).send('Group Not Found')
            return
        }

        // find the organization
        let matchingOrg = matchingGroup.Organizations.find(
            (element) => element.OrganizationId == orgId
        )
        if (matchingOrg == null) {
            res.status(404).send('Organization Not Found')
            return
        }

        console.log('Returned data is: ')
        console.log(matchingOrg.Members)
        res.end(JSON.stringify(matchingOrg.Members))
    }
)

// ADD A GROUP
app.post('/api/groups', urlencodedParser, function (req, res) {
    console.log('Received a POST request to add a group')
    console.log('BODY -------->' + JSON.stringify(req.body))

    // assemble group information so we can validate it
    let group = {
        GroupId: getNextId('group'), // assign id to group
        GroupName: req.body.GroupName,
        Organizations: [],
        SponsorName: req.body.SponsorName,
        SponsorPhone: req.body.SponsorPhone,
        SponsorEmail: req.body.SponsorEmail,
        MaxGroupSize: Number(req.body.MaxGroupSize),
    }

    console.log('Performing validation...')
    let errorCode = isValidGroup(group)
    if (errorCode != -1) {
        console.log('Invalid data found! Reason: ' + errorCode)
        res.status(400).send('Bad Request - Incorrect or Missing Data')
        return
    }

    let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
    data = JSON.parse(data)

    // add the group
    data.push(group)

    fs.writeFileSync(__dirname + '/data/groups.json', JSON.stringify(data))

    console.log('Group added: ')
    console.log(group)

    //res.status(201).send();
    res.end(JSON.stringify(group))
    // return the new group w it's GroupId
})

// ADD a COACH TO COACH
app.post('/api/coaches', urlencodedParser, function (req, res) {
    console.log('Received a POST request to add a coach')
    console.log('BODY -------->' + JSON.stringify(req.body))

    // assemble group information so we can validate it
    let coach = {
        CoachId: req.body.CoachId,
        OrganizationName: req.body.OrganizationName,
        CoachName: req.body.CoachName,
        CoachPhoneNumber: req.body.CoachPhoneNumber,
    }

    console.log('Performing validation...')
    let errorCode = isValidCoach(coach)
    if (errorCode != -1) {
        console.log('Invalid data found! Reason: ' + errorCode)
        res.status(400).send('Bad Request - Incorrect or Missing Data')
        return
    }

    let data = fs.readFileSync(__dirname + '/data/coaches.json', 'utf8')
    data = JSON.parse(data)

    // add the group
    data.push(coach)

    fs.writeFileSync(__dirname + '/data/coaches.json', JSON.stringify(data))

    console.log('Coach added: ')
    console.log(coach)

    //res.status(201).send();
    res.end(JSON.stringify(coach))
    // return the new group w it's GroupId
})
// ADD a MEMBER TO MEMBER
app.post('/api/members', urlencodedParser, function (req, res) {
    console.log('Received a POST request to add a coach')
    console.log('BODY -------->' + JSON.stringify(req.body))

    // assemble group information so we can validate it
    let member = {
        MemberId: getNextId('member'),
        MemberEmail: req.body.MemberEmail,
        MemberName: req.body.MemberName,
        MemberPhone: req.body.MemberPhone,
    }

    console.log('Performing validation...')
    let errorCode = isValidMember(member)
    if (errorCode != -1) {
        console.log('Invalid data found! Reason: ' + errorCode)
        res.status(400).send('Bad Request - Incorrect or Missing Data')
        return
    }

    let data = fs.readFileSync(__dirname + '/data/members.json', 'utf8')
    data = JSON.parse(data)

    // add the group
    data.push(member)

    fs.writeFileSync(__dirname + '/data/members.json', JSON.stringify(data))

    console.log('Member added: ')
    console.log(member)

    //res.status(201).send();
    res.end(JSON.stringify(member))
    // return the new group w it's GroupId
})

// EDIT A GROUP
app.put('/api/groups', urlencodedParser, function (req, res) {
    console.log('Received a PUT request to group a team')
    console.log('BODY -------->' + JSON.stringify(req.body))

    // assemble group information so we can validate it
    let group = {
        GroupId: req.body.GroupId,
        GroupName: req.body.GroupName,
        SponsorName: req.body.SponsorName,
        SponsorPhone: req.body.SponsorPhone,
        SponsorEmail: req.body.SponsorEmail,
    }

    console.log('Performing validation...')
    let errorCode = isValidGroup(group)
    if (errorCode != -1) {
        console.log('Invalid data found! Reason: ' + errorCode)
        res.status(400).send('Bad Request - Incorrect or Missing Data')
        return
    }

    let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
    data = JSON.parse(data)

    // find the group
    let match = data.find((element) => element.GroupId == req.body.GroupId)
    if (match == null) {
        res.status(404).send('Group Not Found')
        return
    }

    // update the group
    match.GroupName = req.body.GroupName
    match.SponsorName = req.body.SponsorName
    match.SponsorPhone = req.body.SponsorPhone
    match.SponsorEmail = req.body.SponsorEmail

    // make sure new values for MaxGroupSize doesn't invalidate grooup
    // for (let key of match.Organizations) {
    //     console.log(match.Organizations[key])
    //     if (
    //         Number(req.body.MaxGroupSize) <
    //         match.Organizations[key].Members.length
    //     ) {
    //         res.status(409).send(
    //             'New group size too small based on current number of members'
    //         )
    //         return
    //     }
    // }

    //match.MaxGroupSize = Number(req.body.MaxGroupSize)

    fs.writeFileSync(__dirname + '/data/groups.json', JSON.stringify(data))

    console.log('Update successful!  New values: ')
    console.log(match)
    res.status(200).send()
})

// EDIT AN ORG in a GROUP
app.put(
    '/api/groups/:groupid/organizations/:orgid',
    urlencodedParser,
    function (req, res) {
        console.log('Received a PUT request to group a team')
        console.log('BODY -------->' + JSON.stringify(req.body))

        let groupId = req.params.groupid
        let orgId = req.params.orgid

        // assemble group information so we can validate it
        let organization = {
            OrganizationName: req.body.OrganizationName,
            CoachName: req.body.CoachName,
            CoachPhoneNumber: req.body.CoachPhoneNumber,
        }

        console.log('Performing validation...')
        let errorCode = isValidOrganization(organization)
        if (errorCode != -1) {
            console.log('Invalid data found! Reason: ' + errorCode)
            res.status(400).send('Bad Request - Incorrect or Missing Data')
            return
        }

        let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
        data = JSON.parse(data)

        // find the group
        let match = data.find((element) => element.GroupId == groupId)
        if (match == null) {
            res.status(404).send('Group Not Found')
            return
        }

        let matchedOrg = match.Organizations.find(
            (element) => element.OrganizationId == orgId
        )
        if (matchedOrg == null) {
            res.status(404).send('Group Not Found')
            return
        }

        // update the org
        matchedOrg.OrganizationName = req.body.OrganizationName
        matchedOrg.CoachName = req.body.CoachName
        matchedOrg.CoachPhoneNumber = req.body.CoachPhoneNumber

        // make sure new values for MaxGroupSize doesn't invalidate grooup
        // for (let key of match.Organizations) {
        //     console.log(match.Organizations[key])
        //     if (
        //         Number(req.body.MaxGroupSize) <
        //         match.Organizations[key].Members.length
        //     ) {
        //         res.status(409).send(
        //             'New group size too small based on current number of members'
        //         )
        //         return
        //     }
        // }

        //match.MaxGroupSize = Number(req.body.MaxGroupSize)

        fs.writeFileSync(__dirname + '/data/groups.json', JSON.stringify(data))

        console.log('Update successful!  New values: ')
        console.log(match)
        res.status(200).send()
    }
)

// EDIT AN Member in MEMBER
app.put('/api/members/:memberId', urlencodedParser, function (req, res) {
    console.log('Received a PUT request to edit a member in members.json')
    console.log('BODY -------->' + JSON.stringify(req.body))

    let memberId = req.params.memberId

    // assemble group information so we can validate it
    let member = {
        MemberEmail: req.body.MemberEmail,
        MemberName: req.body.MemberName,
        MemberPhone: req.body.MemberPhone,
    }

    console.log('Performing validation...')
    let errorCode = isValidMember(member)
    if (errorCode != -1) {
        console.log('Invalid data found! Reason: ' + errorCode)
        res.status(400).send('Bad Request - Incorrect or Missing Data')
        return
    }

    let data = fs.readFileSync(__dirname + '/data/members.json', 'utf8')
    data = JSON.parse(data)

    // find the group
    let match = data.find((element) => element.MemberId == memberId)
    if (match == null) {
        res.status(404).send('Group Not Found')
        return
    }

    // update the member
    match.MemberEmail = req.body.MemberEmail
    match.MemberName = req.body.MemberName
    match.MemberPhone = req.body.MemberPhone

    // make sure new values for MaxGroupSize doesn't invalidate grooup
    // for (let key of match.Organizations) {
    //     console.log(match.Organizations[key])
    //     if (
    //         Number(req.body.MaxGroupSize) <
    //         match.Organizations[key].Members.length
    //     ) {
    //         res.status(409).send(
    //             'New group size too small based on current number of members'
    //         )
    //         return
    //     }
    // }

    //match.MaxGroupSize = Number(req.body.MaxGroupSize)

    fs.writeFileSync(__dirname + '/data/members.json', JSON.stringify(data))

    console.log('Update successful!  New values: ')
    console.log(match)
    res.status(200).send()
})
// EDIT AN Coach in Coach
app.put('/api/coaches/:id', urlencodedParser, function (req, res) {
    console.log('Received a PUT request to edit a coach in coach.json')
    console.log('BODY -------->' + JSON.stringify(req.body))

    let coachId = req.params.id

    // assemble group information so we can validate it
    let coach = {
        CoachId: req.body.CoachId,
        OrganizationName: req.body.OrganizationName,
        CoachName: req.body.CoachName,
        CoachPhoneNumber: req.body.CoachPhoneNumber,
    }

    console.log('Performing validation...')
    let errorCode = isValidCoach(coach)
    if (errorCode != -1) {
        console.log('Invalid data found! Reason: ' + errorCode)
        res.status(400).send('Bad Request - Incorrect or Missing Data')
        return
    }

    let data = fs.readFileSync(__dirname + '/data/coaches.json', 'utf8')
    data = JSON.parse(data)

    // find the group
    let match = data.find((element) => element.CoachId == coachId)
    if (match == null) {
        res.status(404).send('Group Not Found')
        return
    }

    // update the member
    match.CoachId = req.body.CoachId
    match.OrganizationName = req.body.OrganizationName
    match.CoachName = req.body.CoachName
    match.CoachPhoneNumber = req.body.CoachPhoneNumber

    // make sure new values for MaxGroupSize doesn't invalidate grooup
    // for (let key of match.Organizations) {
    //     console.log(match.Organizations[key])
    //     if (
    //         Number(req.body.MaxGroupSize) <
    //         match.Organizations[key].Members.length
    //     ) {
    //         res.status(409).send(
    //             'New group size too small based on current number of members'
    //         )
    //         return
    //     }
    // }

    //match.MaxGroupSize = Number(req.body.MaxGroupSize)

    fs.writeFileSync(__dirname + '/data/coaches.json', JSON.stringify(data))

    console.log('Update successful!  New values: ')
    console.log(match)
    res.status(200).send()
})

// DELETE A GROUP
app.delete('/api/groups/:id', function (req, res) {
    let id = req.params.id
    console.log('Received a DELETE request for group ' + id)

    let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
    data = JSON.parse(data)

    // find the index number of the group in the array
    let foundAt = data.findIndex((element) => element.GroupId == id)

    // delete the group if found
    if (foundAt != -1) {
        data.splice(foundAt, 1)
    }

    fs.writeFileSync(__dirname + '/data/groups.json', JSON.stringify(data))

    console.log('Delete request processed')
    // Note:  even if we didn't find the group, send a 200 because they are gone
    res.status(200).send()
})

//ADD a MEMBER TO AN ORGANIZATION WITHIN A GROUP
app.post(
    '/api/groups/:id/organizations/:orgID/members',
    urlencodedParser,
    function (req, res) {
        let id = req.params.id
        let orgID = req.params.orgID
        console.log(
            'Received a POST request to add a member to an organization in group ' +
                id
        )
        console.log('BODY -------->' + JSON.stringify(req.body))

        // assemble member information so we can
        let member = {
            MemberId: getNextId('member'), // assign new id
            MemberEmail: req.body.MemberEmail,
            MemberName: req.body.MemberName,
            MemberPhone: req.body.MemberPhone,
        }

        console.log('Performing member validation...')
        let errorCode = isValidMember(member)
        if (errorCode != -1) {
            console.log('Invalid data found! Reason: ' + errorCode)
            res.status(400).send('Bad Request - Incorrect or Missing Data')
            return
        }

        let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
        data = JSON.parse(data)

        // find the group
        let match = data.find((element) => element.GroupId == id)
        if (match == null) {
            res.status(404).send('Group Not Found')
            return
        }

        for (let key in match.Organizations) {
            if (match.Organizations[key].OrganizationId == orgID) {
                // console.log(match.Organizations[key])
                if (
                    Number(match.MaxGroupSize) ===
                    match.Organizations[key].Members.length
                ) {
                    res.status(409).send(
                        'Members is already full. Cannot add new members'
                    )
                    return
                }
                match.Organizations[key].Members.push(member)
            }
        }

        // add the member
        // if (Number(match.MaxGroupSize) === match.Members.length) {
        //     res.status(409).send(
        //         'Group is already full. Cannot add new members'
        //     )
        //     return
        // }

        fs.writeFileSync(__dirname + '/data/groups.json', JSON.stringify(data))

        console.log('New member added!')
        res.status(200).send()
    }
)

// ADD AN ORGANIZATION TO A GROUP
app.post(
    '/api/groups/:id/organizations',
    urlencodedParser,
    function (req, res) {
        let id = req.params.id
        console.log(
            'Received a POST request to add an organization to a group ' + id
        )
        console.log('BODY -------->' + JSON.stringify(req.body))
        let orgId = getNextId('organization')
        let organization = {
            OrganizationId: `Org${orgId}`,
            OrganizationName: req.body.OrganizationName,
            CoachName: req.body.CoachName,
            CoachPhoneNumber: req.body.CoachPhoneNumber,
            Members: [],
        }

        console.log('Performing organization validation...')
        let errorCode = isValidOrganization(organization)
        if (errorCode != -1) {
            console.log('Invalid data found! Reason: ' + errorCode)
            res.status(400).send('Bad Request - Incorrect or Missing Data')
            return
        }

        let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
        data = JSON.parse(data)

        // find the group
        let match = data.find((element) => element.GroupId == id)
        if (match == null) {
            res.status(404).send('Group Not Found')
            return
        }

        // add the organization
        // if (Number(match.MaxGroupSize) === match.Members.length) {
        //     res.status(409).send(
        //         'Group is already full. Cannot add new members'
        //     )
        //     return
        // }
        match.Organizations.push(organization)

        fs.writeFileSync(__dirname + '/data/groups.json', JSON.stringify(data))

        console.log('New organization added!')
        res.status(200).send()
    }
)

// ADD A MEMBER TO A GROUP
app.post('/api/groups/:id/members', urlencodedParser, function (req, res) {
    let id = req.params.id
    console.log('Received a POST request to add a member to group ' + id)
    console.log('BODY -------->' + JSON.stringify(req.body))

    // assemble member information so we can validate it
    let member = {
        MemberId: getNextId('member'), // assign new id
        MemberEmail: req.body.MemberEmail,
        MemberName: req.body.MemberName,
        MemberPhone: req.body.MemberPhone,
    }

    console.log('Performing member validation...')
    let errorCode = isValidMember(member)
    if (errorCode != -1) {
        console.log('Invalid data found! Reason: ' + errorCode)
        res.status(400).send('Bad Request - Incorrect or Missing Data')
        return
    }

    let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
    data = JSON.parse(data)

    // find the group
    let match = data.find((element) => element.GroupId == id)
    if (match == null) {
        res.status(404).send('Group Not Found')
        return
    }

    // add the member
    if (Number(match.MaxGroupSize) === match.Members.length) {
        res.status(409).send('Group is already full. Cannot add new members')
        return
    }
    match.Members.push(member)

    fs.writeFileSync(__dirname + '/data/groups.json', JSON.stringify(data))

    console.log('New member added!')
    res.status(200).send()
})

// EDIT A MEMBER IN A GROUP
app.put(
    '/api/groups/:groupid/organizations/:orgid/members/:memid',
    urlencodedParser,
    function (req, res) {
        let groupId = req.params.groupid
        let orgId = req.params.orgid
        let memId = req.params.memid

        console.log(
            'Received a PUT request to edit a member in group ' + groupId
        )
        console.log('BODY -------->' + JSON.stringify(req.body))

        // assemble member information so we can validate it
        let member = {
            MemberId: req.body.MemberId,
            MemberEmail: req.body.MemberEmail,
            MemberName: req.body.MemberName,
            MemberPhone: req.body.MemberPhone,
        }

        console.log('Performing member validation...')
        let errorCode = isValidMember(member)
        if (errorCode != -1) {
            console.log('Invalid data found! Reason: ' + errorCode)
            res.status(400).send('Bad Request - Incorrect or Missing Data')
            return
        }

        // find the group
        let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
        data = JSON.parse(data)

        // find the group
        let matchingGroup = data.find((element) => element.GroupId == groupId)
        if (matchingGroup == null) {
            res.status(404).send('Group Not Found')
            return
        }

        // find the org
        let matchingOrg = matchingGroup.Organizations.find(
            (element) => (element.OrganizationId = orgId)
        )
        if (matchingOrg == null) {
            res.status(404).send('Organization Not Found')
            return
        }

        // find the member
        let match = matchingOrg.Members.find((m) => m.MemberId == memId)
        if (match == null) {
            res.status(404).send('Member Not Found')
            return
        }

        // update the member
        match.MemberId = req.body.MemberId
        match.MemberEmail = req.body.MemberEmail
        match.MemberName = req.body.MemberName
        match.MemberPhone = req.body.MemberPhone

        fs.writeFileSync(__dirname + '/data/groups.json', JSON.stringify(data))

        console.log('Member updated!')
        res.status(200).send()
    }
)

// DELETE AN ORGANIZATION IN A GROUP
app.delete(
    '/api/groups/:groupid/organizations/:orgid',
    urlencodedParser,
    function (req, res) {
        let groupId = req.params.groupid
        let orgId = req.params.orgid

        console.log(
            'Received a DELETE request for organization ' +
                orgId +
                ' in group ' +
                groupId
        )

        let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
        data = JSON.parse(data)

        let matchingGroup = data.find((element) => element.GroupId == groupId)
        if (matchingGroup == null) {
            res.status(404).send('Group Not Found')
            return
        }

        // find the org
        let foundAt = matchingGroup.Organizations.findIndex(
            (o) => o.OrganizationId == orgId
        )
        console.log(foundAt)

        // delete the member if found
        if (foundAt != -1) {
            matchingGroup.Organizations.splice(foundAt, 1)
        }

        fs.writeFileSync(__dirname + '/data/groups.json', JSON.stringify(data))

        console.log('Delete request processed')
        // Note:  even if we didn't find them, send a 200 back because they are gone
        res.status(200).send()
    }
)

// DELETE A MEMBER IN A GROUP
app.delete(
    '/api/groups/:groupid/organizations/:orgid/members/:memberid',
    urlencodedParser,
    function (req, res) {
        let groupId = req.params.groupid
        let orgId = req.params.orgid
        let memberId = req.params.memberid
        console.log(
            'Received a DELETE request for member ' +
                memberId +
                ' located in organization ' +
                orgId +
                ' in group ' +
                groupId
        )

        // find the group
        let data = fs.readFileSync(__dirname + '/data/groups.json', 'utf8')
        data = JSON.parse(data)

        let matchingGroup = data.find((element) => element.GroupId == groupId)
        if (matchingGroup == null) {
            res.status(404).send('Group Not Found')
            return
        }

        let matchingOrg = matchingGroup.Organizations.find(
            (element) => element.OrganizationId == orgId
        )
        if (matchingOrg == null) {
            res.status(404).send('Organization Not Found')
            return
        }

        // find the member
        let foundAt = matchingOrg.Members.findIndex(
            (m) => m.MemberId == memberId
        )
        console.log(foundAt)

        // delete the member if found
        if (foundAt != -1) {
            matchingOrg.Members.splice(foundAt, 1)
        }

        fs.writeFileSync(__dirname + '/data/groups.json', JSON.stringify(data))

        console.log('Delete request processed')
        // Note:  even if we didn't find them, send a 200 back because they are gone
        res.status(200).send()
    }
)

// ----------------------------------------------------------------------------
// USER MANAGEMENT

// GET request to check if user name is available
app.get('/api/username_available/:username', function (req, res) {
    let username = req.params.username
    console.log(
        'Checking to see if this username ' + username + ' is available'
    )

    let data = fs.readFileSync(__dirname + '/data/users.json', 'utf8')
    data = JSON.parse(data)

    let matchingUser = data.find(
        (user) => user.username.toLowerCase() == username.toLowerCase()
    )

    let message
    if (matchingUser == null) {
        message = 'YES'
    } else {
        message = 'NO'
    }

    console.log('Is user name available? ' + message)
    res.end(message)
})

// POST request to add a user
app.post('/api/users', urlencodedParser, function (req, res) {
    console.log('Got a POST request to add a user')
    console.log('BODY -------->' + JSON.stringify(req.body))

    let data = fs.readFileSync(__dirname + '/data/users.json', 'utf8')
    data = JSON.parse(data)

    // check for duplicate username
    let matchingUser = data.find(
        (user) => user.username.toLowerCase() == req.body.username.toLowerCase()
    )
    if (matchingUser != null) {
        // username already exists
        console.log('ERROR: username already exists!')
        res.status(403).send() // forbidden
        return
    }

    let user = {
        id: getNextId('user'), // assign new id
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
    }

    data.push(user)

    fs.writeFileSync(__dirname + '/data/users.json', JSON.stringify(data))

    console.log('New user added!')
    console.log(user)
    res.status(200).send()
})

// POST request to login -- sent username and password in request body
app.post('/api/login', urlencodedParser, function (req, res) {
    console.log('Got a POST request for a user to login')
    console.log('BODY -------->' + JSON.stringify(req.body))

    let data = fs.readFileSync(__dirname + '/data/users.json', 'utf8')
    data = JSON.parse(data)

    // check to see if credentials match a user
    let match = data.find(
        (user) =>
            user.username.toLowerCase() == req.body.username.toLowerCase() &&
            user.password == req.body.password
    )

    if (match == null) {
        // credentials don't match any user
        console.log("Error:  credentials don't match known user")
        res.status(403).send() // forbidden
        return
    }

    let user = {
        id: match.id,
        name: match.name,
        username: match.username,
    }

    // login successful - return user w/o password
    console.log('Login successful for: ')
    console.log(user)
    res.end(JSON.stringify(user))
})

// ------------------------------------------------------------------------------
// SITE SET-UP

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

let server = app.listen(8082, function () {
    let port = server.address().port

    console.log('App listening at port %s', port)
})
