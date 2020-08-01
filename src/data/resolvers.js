import { Contacts } from "./dbConnectors";

export const resolvers = {
         Query: {
           getContacts: () => {
             return Contacts.find();
           },
           getOneContact: (root, { id }) => {
             return new Promise((resolve, reject) => {
               Contacts.findById(id, (err, contact) => {
                 if (err) {
                   console.log(`Error in getting one contact: ${err.message}`);
                   reject(err);
                 }

                 resolve(contact);
               });
             });
           },
         },
         Mutation: {
           createContact: (root, { input }) => {
             const newContact = new Contacts({
               firstName: input.firstName,
               lastName: input.lastName,
               email: input.email,
               company: input.company,
             });

             newContact.id = newContact._id;

             return new Promise((resolve, reject) => {
               newContact.save((err) => {
                 if (err) {
                   console.log(
                     `error creating the new contact: ${err.message}`
                   );
                   reject(err);
                 }

                 resolve(newContact);
               });
             });
           },
           updateContact: (root, {input}) => {
             return new Promise((resolve, reject) => {
               Contacts.findOneAndUpdate({_id: input.id}, input, {new: true}, (err, contact) => {
                 if (err) {
                   console.log(
                     `error update the contact with id ${input.id}: ${err.message}`
                   );
                   reject(err);
                 }

                 resolve(contact);
               });
             });
           },
           deleteContact: (root, {id}) => {
              return new Promise((resolve, reject) => {
                Contacts.remove({_id: id},(err) => {
                  if (err) {
                    console.log(
                      `error creating the new contact: ${err.message}`
                    );
                    reject(err);
                  }

                  resolve(true);
                });
              });
           },
         },
       };
