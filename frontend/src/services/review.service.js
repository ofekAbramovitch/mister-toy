import { httpService } from './http.service'
import { userService } from './user.service'

export const reviewService = {
    add,
    query,
    remove
}

function query(filterBy) {
    var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
    return httpService.get(`review${queryStr}`)
}

async function remove(reviewId) {
    await httpService.delete(`review/${reviewId}`)
}

async function add({ txt, aboutUserId }) {
    const addedReview = await httpService.post(`review`, { txt, aboutUserId })
    const aboutUser = await userService.getById(aboutUserId)
    const reviewToAdd = {
        txt,
        byUser: userService.getLoggedinUser(),
        aboutUser: {
            _id: aboutUser._id,
            fullname: aboutUser.fullname,
            imgUrl: aboutUser.imgUrl
        }
    }

    reviewToAdd.byUser.score += 10
    await userService.update(reviewToAdd.byUser)
    return addedReview
}