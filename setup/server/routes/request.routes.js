const router = require("express").Router();
let RequestModel = require("../models/request.model");

// POST REQUEST: create a request
/* 
    //example usage

    Axios.post("http://localhost:5000/requests/", {
        requester: rand_email_id,
        event: rand_event_id
    })
    .then(res => {
        // do stuff...
    })
*/
router.route("/").post((req, res) => {
  RequestModel.findOne({
    requester: req.body.requester,
    event: req.body.event,
  }).then((ans) => {
    if (ans === null) {
      const newRequest = new RequestModel({
        requester: req.body.requester,
        status: "pending",
        event: req.body.event,
      });

      newRequest
        .save()
        .then((r) =>
          res.status(201).json({ msg: "request issued", request: r })
        )
        .catch((err) => {
          res.json({ msg: "request was not issued", err: err });
        });
    } else {
      res.json({ msg: "request already exists", exists: true });
    }
  });
});

// GET REQUEST: get a list of requests by who issued them
/* 
    //example usage (take requester_id from the session token)

    Axios.get("http://localhost:5000/requests/by/requester_id", {})
    .then(res => {
        // do stuff...
    })
*/
router.route("/by/:requester").get((req, res) => {
  RequestModel.find({ requester: req.params.requester })
    .populate([
      "requester",
      {
        path: "event",
        populate: { path: "creator" },
      },
    ])
    .then((r) => res.status(202).json(r))
    .catch((err) => res.json({ err: err }));
});

router.route("/accepted/:requester").get((req, res) => {
  RequestModel.find({ requester: req.params.requester, status: "accepted" })
    .populate([
      "requester",
      {
        path: "event",
        populate: { path: "creator" },
      },
    ])
    .then((r) => res.status(202).json(r))
    .catch((err) => res.json({ err: err }));
});

// GET REQUEST: get a list of requests by who received them
/* 
    //example usage

    Axios.get("http://localhost:5000/requests/for/requestee_id", {})
    .then(res => {
        // do stuff...
    })
*/
router.route("/for/:requestee").get((req, res) => {
  console.log("For");
  RequestModel.find()
    .populate({
      path: "event",
      populate: { path: "creator", model: "user-details" },
    })
    .then((r) =>
      res
        .status(202)
        .json(
          r.filter((request) => request.event.creator && request.event.creator.equals(req.params.requestee))
        )
    ) // remove unmatched requests
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET REQUEST: get a list of requests by event_id
/* 
    //example usage

    Axios.get("http://localhost:5000/requests/event/event_id", {})
    .then(res => {
        // do stuff...
    })
*/
router.route("/event/:event").get((req, res) => {
  RequestModel.find({ event: req.params.event })
    .populate([
      "requester",
      {
        path: "event",
        populate: { path: "creator" },
      },
    ])
    .then((r) => res.status(202).json(r))
    .catch((err) => res.status(400).json({ err: err }));
});

//Return pending 
router.route("/pending/:event").get((req, res) => {
  RequestModel.find({ event: req.params.event, status: "pending" })
    .populate([
      "requester",
      {
        path: "event",
        populate: { path: "creator" },
      },
    ])
    .then((r) => res.status(202).json(r))
    .catch((err) => res.status(400).json({ err: err }));
});

/* 

// POST REQUEST: get a list of requests based on a filter passed in the body

    //example usage

    Axios.post("http://localhost:5000/requests/search", {
        requester: requester@mail.com
        requestee: requestss@mail.com
        event_id: rand_email_id
    }).then(res => {
        // do stuff...
    })

    // all filters are optional, here's another example

    Axios.post("http://localhost:5000/requests/search", {
        requester: requester@mail.com
    }).then(res => {
        // do stuff...
    })


router.route('/search').post(
    (req, res) => {
        //console.log(req.body.requester);
        RequestModel.find(req.body)
        .then(r => res.status(202).json(r))
        .catch(err => res.json({err: err}))
    }
)
 */

// DELETE REQUEST: delete a request object by its _id
/* 
    //example usage

    Axios.post("http://localhost:5000/requests/delete/request_id")
    .then(res => {
        // do stuff...
    })
 */
router.route("/delete/:_id").delete((req, res) => {
  //console.log(req.body.requester);
  RequestModel.deleteOne({ _id: req.params._id })
    .then((r) => res.status(203).json(r))
    .catch((err) => res.json({ err: err }));
});

// PATCH REQUEST: accept the request by its _id
router.route("/accept/:_id").patch((req, res) => {
  RequestModel.findOneAndUpdate({_id: req.params._id}, {status: 'accepted'})
    .then((r) => res.status(203).json(r))
    .catch((err) => res.json({ err: err }));
});

// PATCH REQUEST: reject the request by its _id
router.route("/reject/:_id").patch((req, res) => {
  RequestModel.findOneAndUpdate({_id: req.params._id}, {status: 'rejected'})
    .then((r) => res.status(203).json(r))
    .catch((err) => res.json({ err: err }));
});

module.exports = router;
