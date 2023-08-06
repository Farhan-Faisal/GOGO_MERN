const router = require("express").Router();
let PromoterInviteModel = require("../models/promoterInvite.model");
let UserDetailsModel = require("../models/userDetails.model");

// POST INVITE: create an invite
/* 
    //example usage

    Axios.post(process.env.BASE_URL + "/promoter-invites/", {
        inviteeEmail: invitee_email,
        promoterEmail: promoter_email,
        event: rand_event_id
    })
    .then(res => {
        // do stuff...
    })
*/

router.route("/event/:event_id").get((req, res) => {
    PromoterInviteModel.find({ event: req.params.event_id })
      .populate(["invitee"])
      .then((r) => res.status(200).json(r))
      .catch((err) => res.status(404).json({ err: err }));
  });

router.route("/").post(async (req, res) => {
    const inviteeEmail = req.body.inviteeEmail;
    const promoterEmail = req.body.promoterEmail;
  
    const invitee = await UserDetailsModel.findOne({
      email: inviteeEmail
    });

    const promoter = await UserDetailsModel.findOne({
      email: promoterEmail
    });

    if (invitee === null || promoter === null){
        res.status(404).json({ msg: "could not find invitee or promoter" + promoterEmail});
    }

    //TODO: CHECK IF THE PROMOTER GIVEN HAS PROMOTER STATUS
  
    PromoterInviteModel.findOne({
      invitee: invitee._id,
      promoter: promoter._id,
      event: req.body.event,
    }).then((ans) => {
      if (ans === null) {
        const newRequest = new PromoterInviteModel({
          invitee: invitee._id,
          promoter: promoter._id,
          status: "pending",
          event: req.body.event,
        });
  
        newRequest
          .save()
          .then((r) =>
            res.status(200).json({ msg: "invite issued", request: r })
          )
          .catch((err) => {
            res.status(404).json({ msg: "invite was not issued", err: err });
          });
      } else {
        res.status(409).json({ msg: "request already exists" });
      }
    });
  });

// GET REQUEST: get a list of invites by who issued them
/* 
    //example usage (take promoter_id from the session token)

    Axios.get(process.env.BASE_URL + "/requests/by/promoter_id", {})
    .then(res => {
        // do stuff...
    })
*/
router.route("/by/:promoter").get((req, res) => {
  PromoterInviteModel.find({ promoter: req.params.promoter })
    .populate([
      "invitee",
      "promoter",
      {
        path: "event"
      },
    ])
    .then((r) => res.status(202).json(r))
    .catch((err) => res.json({ err: err }));
});


// DELETE INVITE: delete a request object by its _id
/* 
    //example usage

    Axios.post(process.env.BASE_URL + "/promoter-invites/delete/invite._id")
    .then(res => {
        // do stuff...
    })
 */
router.route("/delete/:_id").delete((req, res) => {
  //console.log(req.body.requester);
  PromoterInviteModel.deleteOne({ _id: req.params._id })
    .then((r) => res.status(203).json(r))
    .catch((err) => res.json({ err: err }));
});

// PATCH INVITE: accept the request by its _id
/* 
    //example usage

    Axios.post(process.env.BASE_URL + "/promoter-invites/accept/invite._id")
    .then(res => {
        // do stuff...
    })
 */
router.route("/accept/:_id").patch((req, res) => {
  PromoterInviteModel.findOneAndUpdate({_id: req.params._id}, {status: 'accepted'})
    .then((r) => res.status(203).json(r))
    .catch((err) => res.status(400).json({ err: err }));
});

// PATCH INVITE: reject the request by its _id
/* 
    //example usage

    Axios.post(process.env.BASE_URL + "/promoterInvite/reject/promoterInvite_id")
    .then(res => {
        // do stuff...
    })
 */
router.route("/reject/:_id").patch((req, res) => {
  PromoterInviteModel.findOneAndUpdate({_id: req.params._id}, {status: 'rejected'})
    .then((r) => res.status(203).json(r))
    .catch((err) => res.status(400).json({ err: err }));
});

// GET REQUEST: get a list of invites by invitees
/* 
    //example usage (take promoter_id from the session token)

    Axios.get(process.env.BASE_URL + "/requests/by/:invitee_id", {})
    .then(res => {
        // do stuff...
    })
*/
router.route("/to/:invitee").get((req, res) => {
  PromoterInviteModel.find({ invitee: req.params.invitee, status: "pending"})
    .populate([
      "invitee",
      "promoter",
      {
        path: "event"
      },
    ])
    .then((r) => res.status(202).json(r))
    .catch((err) => res.json({ err: err }));
});


router.route("/accepted/:invitee").get((req, res) => {
  PromoterInviteModel.find({ invitee: req.params.invitee, status: "accepted"})
    .populate([
      "invitee",
      "promoter",
      {
        path: "event"
      },
    ])
    .then((r) => res.status(202).json(r))
    .catch((err) => res.json({ err: err }));
});


module.exports = router;
