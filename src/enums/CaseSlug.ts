export namespace CaseSlugs {
    export namespace PullRequest {
        export const enum Opened {
            Fresh = "PullRequest.Opened.Fresh",
            PreviouslyMerged = "PullRequest.Opened.PreviouslyMerged",
            PreviouslyClosed = "PullRequest.Opened.PreviouslyClosed"
        }

        export const enum Closed {
            MergedManyReviews = "PullRequest.Closed.Merged.ManyReviews",
            MergedFewReviews = "PullRequest.Closed.Merged.FewReviews",
            MergedNoReviews = "PullRequest.Closed.Merged.NoReviews",

            NotMergedManyReviews = "PullRequest.Closed.NotMerged.ManyReviews",
            NotMergedFewReviews = "PullRequest.Closed.NotMerged.FewReviews",
            NotMergedNoReviews = "PullRequest.Closed.NotMerged.NoReviews",

            NotMergedPreviouslyClosed = "PullRequest.Closed.NotMerged.PreviouslyClosed",
        }

        export const enum Reviewer {
            Added = "PullRequest.Reviewer.Added",
            Removed = "PullRequest.Reviewer.Removed",

        }

        export namespace Review {
            export const enum Submitted {
                Approved = "PullRequest.Review.Submitted.Approved",
                ChangesRequested =  "PullRequest.Review.Submitted.ChangesRequested",
                Commented =  "PullRequest.Review.Submitted.Commented",

            }
        }


    }

    export namespace Issue {
        export namespace Comment {
            export namespace Created {
                export const enum BotTagged {
                    ParametersProvided = "Issue.Comment.Created.BotTagged.ParametersProvided",
                    ParametersNotProvided =  "Issue.Comment.Created.BotTagged.ParametersNotProvided",

                }
            }

        }
    }

    export type Types =//Plural or singular?

        | CaseSlugs.PullRequest.Opened.Fresh
        | CaseSlugs.PullRequest.Opened.PreviouslyMerged
        | CaseSlugs.PullRequest.Opened.PreviouslyClosed

        | CaseSlugs.PullRequest.Closed.MergedManyReviews
        | CaseSlugs.PullRequest.Closed.MergedFewReviews
        | CaseSlugs.PullRequest.Closed.MergedNoReviews
        | CaseSlugs.PullRequest.Closed.NotMergedManyReviews
        | CaseSlugs.PullRequest.Closed.NotMergedFewReviews
        | CaseSlugs.PullRequest.Closed.NotMergedNoReviews
        | CaseSlugs.PullRequest.Closed.NotMergedPreviouslyClosed

        | CaseSlugs.PullRequest.Reviewer.Added
        | CaseSlugs.PullRequest.Reviewer.Removed

        | CaseSlugs.PullRequest.Review.Submitted.Approved
        | CaseSlugs.PullRequest.Review.Submitted.ChangesRequested
        | CaseSlugs.PullRequest.Review.Submitted.Commented


        | CaseSlugs.Issue.Comment.Created.BotTagged.ParametersProvided
        | CaseSlugs.Issue.Comment.Created.BotTagged.ParametersNotProvided

    ;
}

