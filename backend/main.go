package main

import (
	"fmt"
	"net/http"
	"os/exec"
	"regexp"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	r := gin.Default()

	router := gin.Default()

	r.Use(cors.Default())
	// Configure CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"*localhost:3000"}        // Replace with your frontend URL
	config.AllowMethods = []string{"GET", "POST", "OPTIONS"} // Add any additional HTTP methods your frontend uses
	router.Use(cors.New(config))

	// write api to accept upload file from frontend
	r.POST("/upload", func(c *gin.Context) {
		file, err := c.FormFile("file")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// save the file to a specific location
		err = c.SaveUploadedFile(file, "./upload-script/build/"+file.Filename)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		// Execute the additional code
		cmd := exec.Command("bash", "./upload-script/upload-d-storage.sh", file.Filename)

		output, err := cmd.CombinedOutput()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		fmt.Println(string(output))

		tx := string(output)

		re := regexp.MustCompile(`transaction hash:\s+(\w+)`)
		match := re.FindStringSubmatch(tx)
		var transactionHash string
		if len(match) > 1 {
			transactionHash = match[1]
			fmt.Println("transaction:", transactionHash)
		} else {
			transactionHash = "Transaction Timeout but still uploading..."
		}

		// handle successful upload
		c.JSON(http.StatusOK, gin.H{
			"message": "File uploaded successfully!",
			"tx":      transactionHash,
		})
	})

	r.Run(":3001")
}
