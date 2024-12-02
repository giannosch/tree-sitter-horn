// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "TreeSitterHorn",
    products: [
        .library(name: "TreeSitterHorn", targets: ["TreeSitterHorn"]),
    ],
    dependencies: [
        .package(url: "https://github.com/ChimeHQ/SwiftTreeSitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterHorn",
            dependencies: [],
            path: ".",
            sources: [
                "src/parser.c",
                // NOTE: if your language has an external scanner, add it here.
            ],
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterHornTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterHorn",
            ],
            path: "bindings/swift/TreeSitterHornTests"
        )
    ],
    cLanguageStandard: .c11
)
