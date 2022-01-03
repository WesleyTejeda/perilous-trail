export const authenticationCheck = (req, res, next) => {
    !(req.session && req.session.username) ? res.redirect("/") : next();
}