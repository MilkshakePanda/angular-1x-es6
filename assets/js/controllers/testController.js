class MainController {
    
    constructor(TestService) {
        this.name = "Bobbie Garcia"
        this.testService = TestService
    }

    getStuff(){
        this.testService.getData()
            .then(
                (response) => {
                    this.photos = response.data.slice(0, 22)
                },
                (err) => console.log(err) 
            )
    }
    
}

MainController.$inject = ['TestService']

export {MainController}
