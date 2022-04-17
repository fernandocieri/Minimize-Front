export default function useFormValidation() {
    const validations = {
        required: {
            value: true,
            message: 'this is required'
        },
        url: {
            value: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
            message: 'invalid format'
        },
        customName: {
            value: /^[a-z]+(-[a-z]+)*$/,
            message: 'can only be lowercase and separated by hyphens'
        }
    }
    return validations;
}