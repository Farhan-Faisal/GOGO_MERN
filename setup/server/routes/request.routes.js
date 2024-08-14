const router = require("express").Router();
let RequestModel = require("../models/request.model");

router.route("/").post((req, res) => {
  RequestModel.findOne({
    requester: req.body.requester,
    requestee: req.body.requestee
  }).then((ans) => {
    if (ans === null) {
      const newRequest = new RequestModel({
        requester: req.body.requester,
        status: "pending",
        requestee: req.body.requestee,
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

    Axios.get(process.env.BASE_URL + "/requests/by/requester_id", {})
    .then(res => {
        // do stuff...
    })
*/
// router.route("/by/:requester").get((req, res) => {
//   RequestModel.find({ requester: req.params.requester })
//     .populate([
//       "requester",
//       {
//         path: "event",
//         populate: { path: "creator" },
//       },
//     ])
//     .then((r) => res.status(202).json(r))
//     .catch((err) => res.json({ err: err }));
// });

// router.route("/accepted/:requester").get((req, res) => {
//   RequestModel.find({ requester: req.params.requester, status: "accepted" })
//     .populate([
//       "requester",
//       {
//         path: "event",
//         populate: { path: "creator" },
//       },
//     ])
//     .then((r) => res.status(202).json(r))
//     .catch((err) => res.json({ err: err }));
// });

// GET REQUEST: get a list of requests by who received them
/* 
    //example usage

    Axios.get(process.env.BASE_URL + "/requests/for/requestee_id", {})
    .then(res => {
        // do stuff...
    })
*/
// router.route("/for/:requestee").get((req, res) => {
//   console.log("For");
//   RequestModel.find()
//     .populate({
//       path: "event",
//       populate: { path: "creator", model: "user-details" },
//     })
//     .then((r) =>
//       res
//         .status(202)
//         .json(
//           r.filter((request) => request.event.creator && request.event.creator.equals(req.params.requestee))
//         )
//     ) // remove unmatched requests
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// GET REQUEST: get a list of requests by event_id
/* 
    //example usage

    Axios.get(process.env.BASE_URL + "/requests/event/event_id", {})
    .then(res => {
        // do stuff...
    })
*/
// router.route("/event/:event").get((req, res) => {
//   RequestModel.find({ event: req.params.event })
//     .populate([
//       "requester",
//       {
//         path: "event",
//         populate: { path: "creator" },
//       },
//     ])
//     .then((r) => res.status(202).json(r))
//     .catch((err) => res.status(400).json({ err: err }));
// });

//Return pending 
router.route("/pending/:event").get((req, res) => {
  RequestModel.find({ event: req.params.event, status: "pending" })
    .populate("requestee")
    .then((r) => res.status(202).json(r))
    .catch((err) => res.status(400).json({ err: err }));
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
