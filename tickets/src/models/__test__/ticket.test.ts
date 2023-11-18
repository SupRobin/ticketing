import {Ticket} from "../tickets";

it('implements optimistic concurrency control', async () => {
    //Create instance of a ticket
    const ticket = Ticket.build({
        title: 'concert',
        price: 5,
        userId: '123'
    });

    await ticket.save();

    //save the ticket to the database

    //fetch the ticket twice
    const firstInstance = await Ticket.findById(ticket.id)
    const secondInstance = await Ticket.findById(ticket.id)
    //make two separate changes to the ticket we fetched
    firstInstance!.set({price: 10});
    secondInstance!.set({price: 15});
    // save the first fetched ticket

    //save the second fetched ticket and expect an error
    await firstInstance!.save();
    try {
        await secondInstance!.save();
    } catch (err) {
        return;
    }
});
